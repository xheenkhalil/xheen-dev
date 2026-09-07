import assert from "node:assert/strict";
import test from "node:test";
import {
  DEFAULT_APP_NAME,
  DEFAULT_SHORT_NAME,
  appNameFromHost,
  injectGrokPwaHead,
  isDocumentPath,
  isInstallQuery,
  renderWebManifest,
  stripInstallParams,
} from "./grok-pwa-shared.mjs";
import { renderInstallPage } from "./grok-pwa-plugin.mjs";

test("injects branded PWA tags before </head>", () => {
  const out = injectGrokPwaHead("<html><head><title>x</title></head><body></body></html>");
  assert.match(out, /rel="manifest"/);
  assert.match(out, /apple-touch-icon/);
  assert.ok(out.indexOf("manifest") < out.indexOf("</head>"));
});

test("does NOT inject Grok extensions script or grok project id", () => {
  const out = injectGrokPwaHead("<html><head></head></html>", {
    appName: "Moses Thomas",
    projectId: "",
  });
  assert.doesNotMatch(out, /grok-app-builder\/extensions\.js/);
  assert.doesNotMatch(out, /grok-project-id/);
  assert.doesNotMatch(out, /data-project-id/);
  assert.doesNotMatch(out, /property="grok:app_id"/);
});

test("renders branded web manifest with Moses Thomas", () => {
  const raw = renderWebManifest("xheen.tech");
  const manifest = JSON.parse(raw);
  assert.equal(manifest.name, DEFAULT_APP_NAME);
  assert.equal(manifest.short_name, DEFAULT_SHORT_NAME);
  assert.equal(manifest.background_color, "#101412");
  assert.equal(manifest.theme_color, "#101412");
  assert.ok(manifest.icons.some((i) => i.src === "/apple-touch-icon.png"));
});

test("identifies document paths vs assets", () => {
  assert.equal(isDocumentPath("/"), true);
  assert.equal(isDocumentPath("/about"), true);
  assert.equal(isDocumentPath("/api/data"), false);
  assert.equal(isDocumentPath("/styles.css"), false);
  assert.equal(isDocumentPath("/image.png"), false);
});

test("identifies install query parameters", () => {
  assert.equal(isInstallQuery("/?install=1&platform=ios"), true);
  assert.equal(isInstallQuery("/?install=true&platform=ios"), true);
  assert.equal(isInstallQuery("/?install=1&platform=android"), false);
  assert.equal(isInstallQuery("/"), false);
});

test("stripInstallParams removes install params cleanly", () => {
  assert.equal(stripInstallParams("/?install=1&platform=ios"), "/");
  assert.equal(stripInstallParams("/hire?install=1&platform=ios&foo=bar"), "/hire?foo=bar");
});

test("renders branded install page for Moses Thomas", () => {
  const html = renderInstallPage("xheen.tech", "/?install=1&platform=ios");
  assert.match(html, /Moses Thomas/);
  assert.doesNotMatch(html, /Powered by Grok/);
  assert.doesNotMatch(html, /logo-grok\.svg/);
});
