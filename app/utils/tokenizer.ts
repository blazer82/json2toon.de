import { encode } from 'gpt-tokenizer';

export function countTokens(text: string): number {
  if (!text || !text.trim()) return 0;
  try {
    return encode(text).length;
  } catch {
    // Fallback: rough estimate (1 token per 4 chars)
    return Math.ceil(text.length / 4);
  }
}

export function calculateSavings(
  inputTokens: number,
  outputTokens: number
): { saved: number; percentage: number } {
  const saved = inputTokens - outputTokens;
  const percentage = inputTokens > 0 ? Math.round((saved / inputTokens) * 100) : 0;
  return { saved, percentage };
}
