import { useCallback, useEffect, useState } from 'react';

export type ConversionMode = 'json-to-toon' | 'toon-to-json';

interface ConversionResult {
  output: string;
  error: string | null;
  isConverting: boolean;
}

export function useConverter(
  input: string,
  mode: ConversionMode,
  debounceMs = 150
): ConversionResult {
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    setIsConverting(true);

    const timer = setTimeout(async () => {
      try {
        if (mode === 'json-to-toon') {
          // First validate JSON
          const parsed = JSON.parse(input);
          // Dynamic import to ensure client-side only
          const { encode } = await import('@toon-format/toon');
          const result = encode(parsed);
          setOutput(result);
          setError(null);
        } else {
          // TOON to JSON
          const { decode } = await import('@toon-format/toon');
          const parsed = decode(input);
          const result = JSON.stringify(parsed, null, 2);
          setOutput(result);
          setError(null);
        }
      } catch (e) {
        if (e instanceof SyntaxError) {
          setError(
            mode === 'json-to-toon' ? `Invalid JSON: ${e.message}` : `Invalid TOON: ${e.message}`
          );
        } else if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('Conversion failed');
        }
        setOutput('');
      } finally {
        setIsConverting(false);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [input, mode, debounceMs]);

  return { output, error, isConverting };
}
