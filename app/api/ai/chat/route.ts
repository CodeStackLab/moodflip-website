import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
    }

    const apiKey = process.env.MISTRAL_API_KEY || process.env.NEXT_PUBLIC_MISTRAL_API_KEY || 'Un0oIoMJJSt3pTgqs65EbD9EcPDszYb6';

    const systemPrompt = `You are "MoodFlip AI", an empathetic, gentle, and science-backed emotional wellness assistant. 
Your goal is to help users process difficult emotions (anxiety, sadness, overwhelm, stress, loneliness), provide micro-actions, and offer uplifting cognitive reframing.
Rules:
- Be warm, empathetic, respectful, and concise (2-4 sentences per response).
- Offer practical, 60-second micro-actions when appropriate.
- Always include a disclaimer if severe distress is mentioned (e.g. recommend calling 988 or professional support).
- Do NOT give medical diagnoses or clinical advice.`;

    const fullMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content
      }))
    ];

    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: fullMessages,
        temperature: 0.7,
        max_tokens: 400,
      }),
    });

    if (!response.ok) {
      await response.text();
      return NextResponse.json({ error: 'Failed to generate AI response' }, { status: 500 });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'I am here with you. Take a deep breath.';

    return NextResponse.json({ success: true, reply });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
