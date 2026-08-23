import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { mood, feeling } = await req.json();

    if (!mood || !feeling) {
      return NextResponse.json({ error: 'Mood and feeling are required' }, { status: 400 });
    }

    const apiKey = process.env.MISTRAL_API_KEY || process.env.NEXT_PUBLIC_MISTRAL_API_KEY || 'Un0oIoMJJSt3pTgqs65EbD9EcPDszYb6';

    const systemPrompt = `You are MoodFlip — a warm, compassionate emotional wellbeing guide. MoodFlip is a self-reflection tool, not a medical service. 
When a user shares their current mood and specific feeling, generate a JSON response with:
1. "reframingQuote": A short, comforting, 1-sentence reframing insight to help them feel understood.
2. "actionTitle": A gentle 3-6 word title for a 60-second micro-action.
3. "actionSteps": An array of 3 bullet points for a 60-second micro-action (step-by-step instructions).
4. "wellbeingNote": A 1-sentence gentle note on why this simple action may help you feel calmer.

Respond ONLY with valid raw JSON (no markdown block wrappers).`;

    const userMessage = `My current mood is "${mood}" and I feel "${feeling}". Please give me a 60-second positive flip.`;

    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 450,
      }),
    });

    if (!response.ok) {
      await response.text();
      return NextResponse.json({ error: 'Failed to generate AI flip' }, { status: 500 });
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || '';
    
    // Clean potential markdown wrap
    const cleanedContent = rawContent.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/, '').trim();

    try {
      const parsed = JSON.parse(cleanedContent);
      return NextResponse.json({ success: true, aiData: parsed });
    } catch (parseError) {
      return NextResponse.json({ 
        success: true, 
        aiData: {
          reframingQuote: rawContent.slice(0, 150),
          actionTitle: "60-Second Mindset Shift",
          actionSteps: ["Take 3 deep box breaths (4s in, 4s hold, 4s out)", "Relax your shoulders and drop your jaw", "Remind yourself: 'This feeling is temporary'"],
          scienceInsight: "Taking slow breaths and gentle movement can help many people feel calmer and more settled.",
          wellbeingNote: "Taking slow breaths and gentle movement can help many people feel calmer and more settled."
        }
      });
    }

  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
