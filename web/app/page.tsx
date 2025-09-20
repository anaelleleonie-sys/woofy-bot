"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const askWoofy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setLoading(true);
    setReply(null);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.reply || "Erreur API");
      setReply(data.reply || "Pas de réponse 😅");
    } catch (err: any) {
      setError(err.message || "Erreur côté client");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <img src="/dog.png" alt="Woofy" className={styles.avatar} />

      <h1 className={styles.title}>Bienvenue, je suis Woofy 🐾</h1>
      <p className={styles.subtitle}>
        Ton assistant chien prêt à répondre à toutes tes questions sur
        l’alimentation, la santé et l’éducation !
      </p>

      {/* Formulaire de chat directement sur la home */}
      <form onSubmit={askWoofy} style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Pose ta question (chiens/animaux)…"
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 12,
            border: "1px solid #ddd",
          }}
        />
        <button
          type="submit"
          disabled={loading || !message.trim()}
          className={styles.cta}
          style={{ cursor: loading ? "not-allowed" : "pointer" }}
        >
          {loading ? "Woofy réfléchit…" : "Envoyer"}
        </button>
      </form>

      {error && (
        <div style={{ color: "#b00020", marginTop: 10 }}>❌ {error}</div>
      )}

      {reply && (
        <div
          style={{
            marginTop: 16,
            background: "#fafafa",
            border: "1px solid #eee",
            borderRadius: 12,
            padding: 16,
            maxWidth: 700,
          }}
        >
          <strong>Woofy :</strong> {reply}
        </div>
      )}
    </main>
  );
}
