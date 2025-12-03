# json2toon

Free online JSON to TOON converter. Optimize LLM token usage with Token-Oriented Object Notation.

**Live at [json2toon.de](https://json2toon.de)**

## When to Use TOON

TOON saves tokens for **uniform arrays** (20-35% vs minified JSON). For nested structures or configs, minified JSON is often more efficient.

| Data Type        | vs Minified JSON                |
| ---------------- | ------------------------------- |
| Uniform arrays   | 20-35% savings                  |
| Mixed structures | 0-15% savings                   |
| Nested configs   | -10% to -20% (increases tokens) |

## Features

- Real-time JSON to TOON conversion
- TOON to JSON conversion
- Token count comparison with Format/Minify toggle
- One-click copy
- Client-side only - your data never leaves your browser

Works with Claude, GPT-4, and all major AI models.

## Development

```bash
npm install
npm run dev
```

## Links

- [TOON Format Specification](https://toonformat.dev)

## License

MIT
