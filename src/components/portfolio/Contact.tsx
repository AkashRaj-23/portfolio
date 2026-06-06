import { useState } from "react";
import { SectionHeader } from "./About";
import socials from "@/data/socials.json";
import { Mail, MapPin, Send, Github, Linkedin, Instagram, AtSign, CheckCircle2, Loader2 } from "lucide-react";

const ICONS: Record<string, any> = { Github, Linkedin, Instagram, AtSign, Mail };

// Replace with your Web3Forms access key (free): https://web3forms.com
const WEB3FORMS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    form.append("access_key", WEB3FORMS_KEY);
    form.append("subject", `Portfolio enquiry from ${form.get("name")}`);
    try {
      if (WEB3FORMS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY") {
        // Fallback: open mailto so the form is usable until the key is added
        const body = `From: ${form.get("name")} <${form.get("email")}>%0D%0A%0D%0A${form.get("message")}`;
        window.location.href = `mailto:${socials.email}?subject=Portfolio%20enquiry&body=${body}`;
        setStatus("ok");
        return;
      }
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: form });
      const data = await res.json();
      setStatus(data.success ? "ok" : "err");
      if (data.success) (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("err");
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          eyebrow="// 07 · CONTACT"
          title={<>Let's build <span className="text-gradient">something real</span>.</>}
          sub="Internships, collaborations, or just a chat about robotics — drop a line."
        />

        <div className="mt-14 grid lg:grid-cols-[1fr_1.2fr] gap-6">
          <div className="glass-strong rounded-3xl p-8 space-y-6">
            <ContactRow icon={Mail} label="Email" value={socials.email} href={`mailto:${socials.email}`} />
            <ContactRow icon={MapPin} label="Location" value={socials.location} />
            <div>
              <p className="text-xs font-mono text-primary-glow uppercase tracking-widest mb-3">Socials</p>
              <div className="flex flex-wrap gap-2">
                {socials.links.map((s) => {
                  const Icon = ICONS[s.icon] || Mail;
                  return (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl glass hover:bg-primary/15 hover:text-primary-glow transition-colors text-sm"
                    >
                      <Icon className="size-4" /> {s.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="glass-strong rounded-3xl p-8 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field name="name" label="Your name" required />
              <Field name="email" label="Email" type="email" required />
            </div>
            <Field name="message" label="Message" textarea required />
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
            <button
              disabled={status === "loading"}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-medium hover:shadow-[0_0_40px_oklch(0.68_0.22_295/0.6)] transition-shadow disabled:opacity-60"
            >
              {status === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
              {status === "ok" ? "Sent — thanks!" : "Send message"}
            </button>
            {status === "ok" && (
              <p className="text-sm text-green-400 flex items-center gap-2">
                <CheckCircle2 className="size-4" /> Your message is on its way.
              </p>
            )}
            {status === "err" && (
              <p className="text-sm text-destructive">Something went wrong. Email me directly: {socials.email}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon: Icon, label, value, href }: any) {
  const Wrap: any = href ? "a" : "div";
  return (
    <Wrap href={href} className="flex items-center gap-4 group">
      <div className="size-11 grid place-items-center rounded-xl bg-gradient-to-br from-primary/30 to-primary-glow/20 text-primary-glow group-hover:scale-110 transition-transform">
        <Icon className="size-5" />
      </div>
      <div>
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </Wrap>
  );
}

function Field({ name, label, type = "text", textarea = false, required }: any) {
  const cls =
    "w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all";
  return (
    <label className="block">
      <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">{label}</span>
      {textarea ? (
        <textarea name={name} required={required} rows={5} className={`${cls} mt-1.5 resize-none`} />
      ) : (
        <input name={name} type={type} required={required} className={`${cls} mt-1.5`} />
      )}
    </label>
  );
}
