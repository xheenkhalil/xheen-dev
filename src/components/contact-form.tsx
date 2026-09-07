import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/data/site";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const body = encodeURIComponent(
      `From: ${name} <${email}>\n\n${message}`,
    );
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
    setStatus("sent");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <label className="grid gap-2 text-sm font-medium">
        Name
        <Input name="name" autoComplete="name" required />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Email
        <Input name="email" type="email" autoComplete="email" required />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Subject
        <Input name="subject" required />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Message
        <Textarea name="message" required />
      </label>
      <Button type="submit">Send message</Button>
      {status === "sent" ? (
        <p className="text-sm text-muted-foreground">
          Your mail app should open. If it does not, write {site.email} directly.
        </p>
      ) : null}
    </form>
  );
}
