/**
 * Image upload — saves to `public/images/projects/` (local dev).
 *
 * Accepts base64-encoded image data, writes to disk, returns the public path.
 * Supports multi-image upload for projects.
 */
import { createServerFn } from "@tanstack/react-start";
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { existsSync } from "node:fs";
import { requireAdmin } from "./admin-auth";

const UPLOAD_DIR = join(process.cwd(), "public", "images", "projects");

interface UploadInput {
  /** Base64-encoded file content (without data URL prefix) */
  base64: string;
  /** Original filename — used to derive extension */
  filename: string;
}

export const uploadImage = createServerFn({ method: "POST" })
  .validator((input: UploadInput) => input)
  .handler(async ({ data }) => {
    await requireAdmin();

    // Ensure upload directory exists
    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
    }

    // Sanitize filename: lowercase, replace spaces with hyphens, strip non-safe chars
    const ext = data.filename.split(".").pop()?.toLowerCase() || "jpg";
    const baseName = data.filename
      .replace(/\.[^.]+$/, "") // remove extension
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const uniqueName = `${baseName}-${Date.now()}.${ext}`;
    const filePath = join(UPLOAD_DIR, uniqueName);

    // Write file
    const buffer = Buffer.from(data.base64, "base64");
    await writeFile(filePath, buffer);

    // Return public path
    return { path: `/images/projects/${uniqueName}` };
  });

export const uploadMultipleImages = createServerFn({ method: "POST" })
  .validator((inputs: UploadInput[]) => inputs)
  .handler(async ({ data: files }) => {
    await requireAdmin();

    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
    }

    const paths: string[] = [];
    for (const file of files) {
      const ext = file.filename.split(".").pop()?.toLowerCase() || "jpg";
      const baseName = file.filename
        .replace(/\.[^.]+$/, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      const uniqueName = `${baseName}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}.${ext}`;
      const filePath = join(UPLOAD_DIR, uniqueName);
      const buffer = Buffer.from(file.base64, "base64");
      await writeFile(filePath, buffer);
      paths.push(`/images/projects/${uniqueName}`);
    }

    return { paths };
  });
