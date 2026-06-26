import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, { message: "Please enter your name" }).max(100),
  email: z.string().trim().email({ message: "Enter a valid email" }).max(255),
  project: z.string().trim().min(10, { message: "Tell us a bit more (10+ chars)" }).max(1000),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/contact`;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", project: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const update =
    (k: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [k]: e.target.value }));
      if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
      if (serverError) setServerError(null);
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setSubmitting(true);
    setServerError(null);
    try {
      const res = await fetch(FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ANON_KEY}`,
        },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error ?? "Submission failed");
      }
      setSent(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setValues({ name: "", email: "", project: "" });
    setErrors({});
    setSent(false);
    setServerError(null);
  };

  return (
    <div className="mt-14 max-w-xl mx-auto text-left">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="border border-wire p-8 md:p-10 bg-void/60 text-center"
          >
            <span className="text-volt text-3xl">✦</span>
            <p
              className="font-serif italic text-bone mt-4"
              style={{ fontSize: "clamp(22px, 2.4vw, 32px)", lineHeight: "1.25" }}
            >
              Message received.
            </p>
            <p className="text-stone text-sm mt-3 leading-relaxed">
              Thanks, {values.name.split(" ")[0]}. We'll be in touch within two working days from Lisbon.
            </p>
            <button
              onClick={reset}
              className="mt-6 eyebrow text-stone hover:text-volt transition-colors border-b border-wire pb-1"
            >
              Send another →
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            noValidate
            className="flex flex-col gap-6"
          >
            <Field label="Name" id="name" error={errors.name}>
              <input
                id="name"
                type="text"
                value={values.name}
                onChange={update("name")}
                maxLength={100}
                className="form-input"
                placeholder="Your name"
              />
            </Field>
            <Field label="Email" id="email" error={errors.email}>
              <input
                id="email"
                type="email"
                value={values.email}
                onChange={update("email")}
                maxLength={255}
                className="form-input"
                placeholder="you@studio.com"
              />
            </Field>
            <Field label="Project" id="project" error={errors.project}>
              <textarea
                id="project"
                value={values.project}
                onChange={update("project")}
                maxLength={1000}
                rows={4}
                className="form-input resize-none"
                placeholder="Tell us about the work, scope and timeline."
              />
            </Field>

            {serverError && (
              <p className="text-volt text-sm font-serif italic">{serverError}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              data-magnetic
              className="group inline-flex items-center justify-center gap-4 bg-volt text-abyss px-8 py-5 hover:gap-6 transition-all disabled:opacity-60"
            >
              <span className="font-display text-sm font-medium tracking-wide uppercase">
                {submitting ? "Sending…" : "Send enquiry"}
              </span>
              <span className="text-xl translate-y-px">↗</span>
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="eyebrow text-stone flex items-center justify-between">
        <span>{label}</span>
        {error && (
          <span className="text-volt normal-case tracking-normal text-[11px] italic font-serif">
            {error}
          </span>
        )}
      </label>
      {children}
    </div>
  );
}
