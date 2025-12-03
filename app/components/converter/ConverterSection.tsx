import { useState, useCallback } from 'react';
import { EditorPane } from './EditorPane';
import { TokenStats } from './TokenStats';
import { useConverter, type ConversionMode } from '~/hooks/useConverter';
import { useTokenCount } from '~/hooks/useTokenCount';
import { type SampleData } from '~/utils/samples';

export function ConverterSection() {
  const [mode, setMode] = useState<ConversionMode>('json-to-toon');
  const [input, setInput] = useState('');

  const { output, error, isConverting } = useConverter(input, mode);
  const { inputTokens, outputTokens, saved, percentage, isNegative } = useTokenCount(input, output);

  const handleLoadSample = useCallback((sample: SampleData) => {
    setInput(JSON.stringify(sample.data, null, 2));
    setMode('json-to-toon');
  }, []);

  const inputLabel = mode === 'json-to-toon' ? 'JSON Input' : 'TOON Input';
  const outputLabel = mode === 'json-to-toon' ? 'TOON Output' : 'JSON Output';
  const inputPlaceholder =
    mode === 'json-to-toon'
      ? 'Paste your JSON here...\n\n{\n  "example": "data"\n}'
      : 'Paste your TOON here...';

  return (
    <section className="w-full">
      {/* Mode Toggle */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-lg p-1 bg-gray-100 dark:bg-gray-800">
          <button
            type="button"
            onClick={() => {
              setMode('json-to-toon');
              setInput('');
            }}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              mode === 'json-to-toon'
                ? 'bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            JSON → TOON
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('toon-to-json');
              setInput('');
            }}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              mode === 'toon-to-json'
                ? 'bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            TOON → JSON
          </button>
        </div>
      </div>

      {/* Token Stats */}
      <div className="mb-6">
        <TokenStats
          inputTokens={inputTokens}
          outputTokens={outputTokens}
          saved={saved}
          percentage={percentage}
          isNegative={isNegative}
          mode={mode}
        />
      </div>

      {/* Editor Panes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <EditorPane
          label={inputLabel}
          value={input}
          onChange={setInput}
          placeholder={inputPlaceholder}
          showSamples={mode === 'json-to-toon'}
          onLoadSample={handleLoadSample}
          tokenCount={inputTokens}
          error={error}
        />
        <EditorPane
          label={outputLabel}
          value={output}
          readOnly
          placeholder={isConverting ? 'Converting...' : 'Output will appear here...'}
          tokenCount={outputTokens}
        />
      </div>
    </section>
  );
}
