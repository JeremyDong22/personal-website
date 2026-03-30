// Vite plugin — dev-only endpoints for blog editing and translation
// v2: POST /__blog-api/save (write JSON) + POST /__blog-api/translate (zh→en via LLM)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Helper: read full request body as string
function readBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => resolve(body));
  });
}

// Helper: send JSON response
function jsonRes(res, status, data) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

// Call LLM API (Anthropic-compatible, supports PackyAPI proxy)
async function callLLM(prompt, jsonInput) {
  const baseUrl = process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com';
  const apiKey = process.env.ANTHROPIC_AUTH_TOKEN || process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error(
      'No API key found. Set ANTHROPIC_AUTH_TOKEN or ANTHROPIC_API_KEY, or run `packy -cc` before starting the dev server.'
    );
  }

  const res = await fetch(`${baseUrl}/v1/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 8192,
      messages: [
        {
          role: 'user',
          content: `${prompt}\n\n<json>\n${JSON.stringify(jsonInput, null, 2)}\n</json>`,
        },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`LLM API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const text = data.content?.[0]?.text || '';

  // Extract JSON from response (handle markdown code fences)
  const jsonMatch = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/) || [null, text];
  return JSON.parse(jsonMatch[1].trim());
}

const TRANSLATE_PROMPT = `You are a professional translator for a personal blog. Translate the Chinese content to English.

RULES:
- Return a JSON object with exactly these keys: "title", "excerpt", "blocks"
- "title" and "excerpt" are translated strings
- "blocks" is the translated array of content blocks
- Preserve the exact JSON structure of each block (type, level, src, href, height, portrait, etc.)
- Only translate text-based fields: "text", "alt", "caption", and string items in "items" arrays
- For blocks with "parts" arrays, translate each part's "text" but keep "href" unchanged
- Maintain the author's casual, conversational, first-person tone
- Keep technical terms in English (Claude Code, SaaS, API, MCP, YOLO, etc.)
- Keep proper nouns like brand/product names unchanged
- Return ONLY valid JSON, no other text`;

export default function blogSavePlugin() {
  return {
    name: 'blog-save',
    configureServer(server) {
      // Save endpoint
      server.middlewares.use('/__blog-api/save', async (req, res) => {
        if (req.method !== 'POST') return jsonRes(res, 405, { error: 'Method not allowed' });

        try {
          const post = JSON.parse(await readBody(req));
          if (!post.slug) throw new Error('Missing slug');

          const filePath = path.resolve(__dirname, `src/data/blog/${post.slug}.json`);
          if (!fs.existsSync(filePath)) {
            return jsonRes(res, 404, { error: `Post file not found: ${post.slug}.json` });
          }

          fs.writeFileSync(filePath, JSON.stringify(post, null, 2) + '\n');
          jsonRes(res, 200, { ok: true, slug: post.slug });
        } catch (err) {
          jsonRes(res, 500, { error: err.message });
        }
      });

      // Translate endpoint (zh → en)
      server.middlewares.use('/__blog-api/translate', async (req, res) => {
        if (req.method !== 'POST') return jsonRes(res, 405, { error: 'Method not allowed' });

        try {
          const { title, excerpt, blocks } = JSON.parse(await readBody(req));

          if (!blocks || !Array.isArray(blocks)) {
            return jsonRes(res, 400, { error: 'Missing blocks array' });
          }

          const translated = await callLLM(TRANSLATE_PROMPT, { title, excerpt, blocks });
          jsonRes(res, 200, translated);
        } catch (err) {
          jsonRes(res, 500, { error: err.message });
        }
      });
    },
  };
}
