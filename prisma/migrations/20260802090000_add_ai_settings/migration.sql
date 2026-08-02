CREATE TABLE IF NOT EXISTS "ai_settings" (
  "id" TEXT NOT NULL DEFAULT 'global', "enabled" BOOLEAN NOT NULL DEFAULT true,
  "primaryProvider" TEXT NOT NULL DEFAULT 'openrouter', "primaryModel" TEXT NOT NULL DEFAULT 'openai/gpt-4o-mini',
  "fallbackProvider" TEXT NOT NULL DEFAULT 'gemini', "fallbackModel" TEXT NOT NULL DEFAULT 'gemini-2.0-flash',
  "autoFallback" BOOLEAN NOT NULL DEFAULT true, "openrouterModels" JSONB,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "ai_settings_pkey" PRIMARY KEY ("id")
);