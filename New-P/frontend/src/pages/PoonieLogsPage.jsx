import { useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function PoonieLogsPage() {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/poonie-logs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      if (res.status === 401) {
        setError("Wrong passcode.");
        setData(null);
      } else {
        setData(await res.json());
      }
    } catch {
      setError("Couldn't reach the server.");
    }
    setLoading(false);
  };

  return (
    <main
      className="relative px-6 pb-28 pt-32 sm:px-10 lg:px-16"
      data-testid="poonie-logs-page"
    >
      {!data ? (
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={submit}
          className="mx-auto max-w-sm border border-ink/15 p-8"
        >
          <p className="label">
            <Lock size={11} className="mr-1 inline" /> Private
          </p>
          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Poonie's notebook<span className="text-vermilion">.</span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink/65">
            Every conversation Poonie has had, for Aishwar's eyes only.
          </p>
          <input
            data-testid="logs-passcode"
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Passcode"
            aria-label="Passcode"
            className="mt-6 w-full rounded-full border border-ink/20 bg-transparent px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-vermilion"
          />
          {error && (
            <p className="mt-3 text-sm text-vermilion" data-testid="logs-error">
              {error}
            </p>
          )}
          <button
            data-testid="logs-submit"
            disabled={loading || !passcode}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 text-sm text-paper transition-colors duration-300 hover:bg-vermilion disabled:opacity-40"
          >
            <Lock size={13} /> {loading ? "Opening…" : "Open"}
          </button>
        </motion.form>
      ) : (
        <div className="mx-auto max-w-2xl">
          <p className="label">Private log</p>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            {data.count} conversation{data.count === 1 ? "" : "s"}
            <span className="text-vermilion">.</span>
          </h1>
          {data.count === 0 && (
            <p className="mt-8 text-sm text-ink/55">
              No conversations yet — Poonie's notebook fills up as people talk.
            </p>
          )}
          <div className="mt-10">
            {data.conversations.map((c, i) => (
              <div
                key={i}
                data-testid="logs-entry"
                className="border-t border-ink/15 py-6 last:border-b"
              >
                <p className="text-xs tabular-nums text-ink/45">
                  {c.session_id ? `session ${String(c.session_id).slice(0, 8)} · ` : ""}
                  {c.at || ""}
                </p>
                <p className="mt-2 text-sm font-semibold text-ink">
                  Visitor — {c.question}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink/70">
                  Poonie — {c.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
