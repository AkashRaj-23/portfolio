import { useState } from "react";
import socials from "@/data/socials.json";
import { SectionHeader } from "./About";
import { Github, Linkedin, Instagram, AtSign, Mail, MapPin, Send, Loader2, CheckCircle2 } from "lucide-react";

// Replace with your own access key from https://web3forms.com (free, no backend)
const WEB3FORMS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const fd = new FormData(e.currentTarget);
    fd.append("access_key", WEB3FORMS_KEY);
    fd.append("subject", `Portfolio contact from ${fd.get("name")}`);
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) {
        setStatus("ok");
        (e.target as HTMLFormElement).reset();
      } else setStatus("err");
    } catch {
      setStatus("err");
    }
  }

  return (
    <section id="contact" className="relative py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <SectionHeader eyebrow="// 07 — contact" title="Let's build something" subtitle="For roles, collaborations, or just a good engineering conversation." />
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6 mt-12">
          {/* Info */}
          <div className="glass-strong rounded-2xl p-6 space-y-4">
            <a href={`mailto:${socials.email}`} className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
              <span className="h-10 w-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                <Mail size={16} className="text-primary" />
              </span>
              <span className="font-mono break-all">{socials.email}</span>
            </a>
            <div className="flex items-center gap-3 text-sm">
              <span className="h-10 w-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                <MapPin size={16} className="text-primary" />
              </span>
              <span>{socials.location}</span>
            </div>
            <div className="divider-glow" />
            <div className="grid grid-cols-2 gap-2">
              {[
                { Icon: Github, href: socials.github, label: "GitHub" },
                { Icon: Linkedin, href: socials.linkedin, label: "LinkedIn" },
                { Icon: Instagram, href: socials.instagram, label: "Instagram" },
                { Icon: AtSign, href: socials.threads, label: "Threads" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass glow-hover rounded-xl px-3 py-2.5 text-sm flex items-center gap-2"
                >
                  <Icon size={15} className="text-primary" /> {label}
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="glass-strong rounded-2xl p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <Field name="name" label="Name" required />
              <Field name="email" label="Email" type="email" required />
            </div>
            <Field name="subject" label="Subject" />
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1.5">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                className="w-full rounded-xl bg-background/40 border border-border focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none px-4 py-3 text-sm transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary rounded-xl px-5 py-3 text-sm font-semibold inline-flex items-center gap-2 w-full sm:w-auto justify-center disabled:opacity-60"
            >
              {status === "sending" ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              {status === "ok" ? "Sent!" : "Send Message"}
            </button>
            {status === "ok" && (
              <p className="text-emerald-400 text-sm flex items-center gap-2"><CheckCircle2 size={14} /> Thanks — I'll get back to you soon.</p>
            )}
            {status === "err" && (
              <p className="text-destructive text-sm">
                Something went wrong. Email me directly: <a className="underline" href={`mailto:${socials.email}`}>{socials.email}</a>
              </p>
            )}
            <p className="text-[10px] font-mono text-muted-foreground/70">
              Powered by Web3Forms — set your free access key in <code>src/components/sections/Contact.tsx</code>.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ name, label, type = "text", required }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1.5">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl bg-background/40 border border-border focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none px-4 py-2.5 text-sm transition-colors"
      />
    </div>
  );
}
