// web/app/chat/page.tsx
'use client';
import { useState } from 'react';

export default function ChatPage() {
  const [msg, setMsg] = useState('');
  const [reply, setReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function askWoofy(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setReply(null);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg }),
      });
      const data = await res.json();
      setReply(data.reply ?? JSON.stringify(data));
    } catch (err: any) {
      setReply(`Erreur: ${err?.message || 'inconnue'}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 680, margin: '80px auto', padding: 16 }}>
      <h1>Discuter avec Woofy 🐾</h1>
      <form onSubmit={askWoofy} style={{ display: 'flex', gap: 8 }}>
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Ta question sur les animaux…"
          required
          style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ddd' }}
        />
        <button disabled={loading} style={{ padding: '10px 16px', borderRadius: 8 }}>
          {loading ? 'Envoi…' : 'Envoyer'}
        </button>
      </form>
      {reply && (
        <div style={{ marginTop: 16, padding: 12, background: '#fafafa', borderRadius: 8 }}>
          <strong>Woofy :</strong> {reply}
        </div>
      )}
    </main>
  );
}
