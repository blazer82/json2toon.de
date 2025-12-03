import { useMemo } from 'react';
import { countTokens, calculateSavings } from '~/utils/tokenizer';

interface TokenCountResult {
  inputTokens: number;
  outputTokens: number;
  saved: number;
  percentage: number;
  isNegative: boolean;
}

export function useTokenCount(input: string, output: string): TokenCountResult {
  return useMemo(() => {
    const inputTokens = countTokens(input);
    const outputTokens = countTokens(output);
    const { saved, percentage } = calculateSavings(inputTokens, outputTokens);

    return {
      inputTokens,
      outputTokens,
      saved,
      percentage,
      isNegative: saved < 0,
    };
  }, [input, output]);
}
