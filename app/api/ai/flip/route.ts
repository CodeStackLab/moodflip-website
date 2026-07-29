import { NextResponse } from 'next/server';
import { getActionForFeeling } from '@/lib/moodData';

export const dynamic = 'force-dynamic';

// Hardcoded user-provided Mistral AI key fallback to ensure AI generation works everywhere
const HARDCODED_MISTRAL_KEY = 'HDAXzx4fIuEiYIUrcHKdrEtjb1k7d23m';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { primaryMood, subFeeling, specificFeeling, visitCount = 0 } = body;

    const apiKey = process.env.MISTRAL_API_KEY || HARDCODED_MISTRAL_KEY;

    // Fallback static action if required inputs missing
    const fallback = getActionForFeeling(specificFeeling || subFeeling || 'lonely', Number(visitCount) || Math.floor(Math.random() * 10));

    if (!apiKey) {
      return NextResponse.json({ ...fallback, isAiGenerated: false });
    }

    // Call Mistral AI API for dynamic, unique, personalized 60-second action & target mood
    const systemPrompt = `You are MoodFlip's gentle AI wellness guide. Given a user's current negative emotional state, generate a brand new, highly practical, creative, and comforting 60-second physical or sensory micro-action that helps them shift their mindset, along with an uplifting positive target mood.

Return ONLY a raw valid JSON object with NO markdown formatting, NO code blocks, and NO additional text:
{
  "targetMood": "1 to 3 words describing the positive target state (e.g. 'Connected & Valued', 'Calm & Grounded', 'Reclaimed Peace')",
  "actionText": "1 to 2 clear sentences describing a specific 60-second micro-action (physical touch, breathing, sensory grounding, or gentle movement). Make it unique every time."
}`;

    const userPrompt = `Primary Mood Family: ${primaryMood || 'Sad'}
Sub-Category Feeling: ${subFeeling || 'Lonely'}
Specific Feeling: ${specificFeeling || 'Abandoned'}
Random Seed / Variation: ${Date.now()}_${Math.random()}`;

    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        temperature: 0.95, // High creativity to guarantee NEW fresh results every time
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ]
      })
    });

    if (!response.ok) {
      console.warn('Mistral AI response not ok:', response.status, await response.text());
      return NextResponse.json({ ...fallback, isAiGenerated: false });
    }

    const data = await response.json();
    const contentText = data.choices?.[0]?.message?.content || '';

    // Clean potential markdown quotes/codeblock wrappers from response
    const cleanedJsonStr = contentText
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    const parsed = JSON.parse(cleanedJsonStr);

    if (parsed.targetMood && parsed.actionText) {
      return NextResponse.json({
        targetMood: parsed.targetMood.trim(),
        actionText: parsed.actionText.trim(),
        isAiGenerated: true
      });
    }

    return NextResponse.json({ ...fallback, isAiGenerated: false });
  } catch (error) {
    console.error('AI Mood Flip generation failed, using local fallback:', error);
    // Robust fallback if AI call encounters network or parsing error
    const fallback = getActionForFeeling('lonely', Math.floor(Math.random() * 10));
    return NextResponse.json({ ...fallback, isAiGenerated: false });
  }
}
