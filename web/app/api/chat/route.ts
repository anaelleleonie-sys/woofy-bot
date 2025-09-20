import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Test GET : http://localhost:3000/api/chat
export async function GET() {
  return NextResponse.json({ ok: true, msg: "chat route up ✅" });
}

// Route POST : appelle l'API OpenAI
export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const resp = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        input: `Réponds uniquement à des questions sur les animaux et surtout les chiens. Question : ${message}`,
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return NextResponse.json(
        { reply: `Erreur OpenAI ${resp.status}: ${text}` },
        { status: 500 }
      );
    }

    const data = await resp.json();
    const reply = data.output[0].content[0].text ?? "Je n’ai pas de réponse.";

    return NextResponse.json({ reply });
  } catch (e: any) {
    return NextResponse.json(
      { reply: `Erreur côté serveur : ${e?.message || "inconnue"}` },
      { status: 500 }
    );
  }
}
