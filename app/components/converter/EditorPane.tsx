import { useState, useRef, useEffect, type ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '~/components/ui/Button';
import { samples, type SampleData } from '~/utils/samples';

interface EditorPaneProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  error?: string | null;
  placeholder?: string;
  showSamples?: boolean;
  sampleFormat?: 'json' | 'toon'; // Which format to load from sample
  onLoadSample?: (sample: SampleData) => void;
  tokenCount?: number;
  showFormatToggle?: boolean;
  isFormatted?: boolean;
  onToggleFormat?: () => void;
}

export function EditorPane({
  label,
  value,
  onChange,
  readOnly = false,
  error,
  placeholder,
  showSamples = false,
  sampleFormat = 'json',
  onLoadSample,
  tokenCount,
  showFormatToggle = false,
  isFormatted = true,
  onToggleFormat,
}: EditorPaneProps) {
  const { t } = useTranslation('common');
  const { t: tuc } = useTranslation('useCases');
  const [copied, setCopied] = useState(false);
  const [showSampleDropdown, setShowSampleDropdown] = useState(false);
  const [showOverflowMenu, setShowOverflowMenu] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const overflowRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (overflowRef.current && !overflowRef.current.contains(event.target as Node)) {
        setShowOverflowMenu(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSampleDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      textareaRef.current?.select();
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onChange?.(text);
    } catch {
      // Clipboard permission denied
    }
  };

  const handleClear = () => {
    onChange?.('');
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  const handleSampleSelect = (sample: SampleData) => {
    onLoadSample?.(sample);
    setShowSampleDropdown(false);
  };

  const handleClearFromMenu = () => {
    handleClear();
    setShowOverflowMenu(false);
  };

  const handleCopyFromMenu = async () => {
    await handleCopy();
    setShowOverflowMenu(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <div className="flex items-center gap-2">
          {/* Samples dropdown for input */}
          {showSamples && !readOnly && (
            <div className="relative" ref={dropdownRef}>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowSampleDropdown(!showSampleDropdown)}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                {t('buttons.samples')}
              </Button>
              {showSampleDropdown && (
                <div className="absolute z-10 mt-1 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1">
                  {samples.map((sample) => (
                    <button
                      key={sample.id}
                      type="button"
                      className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => handleSampleSelect(sample)}
                    >
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {tuc(`samples.${sample.id}.name`)}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {tuc(`samples.${sample.id}.description`)}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Format/Minify toggle for JSON input */}
          {showFormatToggle && !readOnly && (
            <Button size="sm" variant="ghost" onClick={onToggleFormat}>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              {isFormatted ? t('buttons.minify') : t('buttons.format')}
            </Button>
          )}

          {/* Paste button - primary action */}
          {!readOnly && (
            <Button size="sm" variant="ghost" onClick={handlePaste}>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              {t('buttons.paste')}
            </Button>
          )}

          {/* Overflow Menu - only show when not readOnly (has multiple actions) */}
          {!readOnly && (
            <div className="relative" ref={overflowRef}>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowOverflowMenu(!showOverflowMenu)}
                aria-label={t('buttons.moreActions')}
                aria-expanded={showOverflowMenu}
                aria-haspopup="menu"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </Button>
              {showOverflowMenu && (
                <div
                  className="absolute right-0 z-10 mt-1 w-36 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1"
                  role="menu"
                  aria-label={t('buttons.moreActions')}
                >
                  {/* Clear option */}
                  <button
                    type="button"
                    role="menuitem"
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                    onClick={handleClearFromMenu}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    {t('buttons.clear')}
                  </button>
                  {/* Copy option */}
                  <button
                    type="button"
                    role="menuitem"
                    className={`w-full px-3 py-2 text-left text-sm transition-colors flex items-center gap-2 ${
                      !value
                        ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        : copied
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={handleCopyFromMenu}
                    disabled={!value}
                  >
                    {copied ? (
                      <>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {t('buttons.copied')}
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        {t('buttons.copy')}
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Prominent Copy button for readOnly panes (output) */}
          {readOnly && (
            <Button
              size="sm"
              variant={copied ? 'primary' : 'ghost'}
              onClick={handleCopy}
              disabled={!value}
            >
              {copied ? (
                <>
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {t('buttons.copied')}
                </>
              ) : (
                <>
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  {t('buttons.copy')}
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Textarea */}
      <div className="relative flex-1 min-h-0">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          readOnly={readOnly}
          placeholder={placeholder}
          spellCheck={false}
          className={`
            w-full h-full min-h-[300px] p-4
            font-mono text-sm leading-relaxed
            bg-gray-50 dark:bg-gray-900
            text-gray-900 dark:text-gray-100
            border rounded-lg
            resize-none
            focus:outline-none focus:ring-2 focus:ring-emerald-500
            ${error ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-700'}
            ${readOnly ? 'cursor-default' : ''}
          `}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
        <div>
          {error ? (
            <span className="text-red-500 dark:text-red-400">{error}</span>
          ) : (
            <span>{t('labels.characters', { count: value.length })}</span>
          )}
        </div>
        {tokenCount !== undefined && (
          <div className="font-medium">{t('labels.tokens', { count: tokenCount })}</div>
        )}
      </div>
    </div>
  );
}
