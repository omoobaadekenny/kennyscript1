import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side with User-Agent header as required
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper function to read the most up-to-date site content from disk
function getSiteContent() {
  try {
    const siteContentRaw = fs.readFileSync(path.join(__dirname, 'src/data/siteContent.json'), 'utf-8');
    return JSON.parse(siteContentRaw);
  } catch (err) {
    console.warn('Could not read siteContent.json:', err);
    return null;
  }
}

// Build dynamic system instruction with grounded site content
function buildSystemInstruction(): string {
  const content = getSiteContent();

  const authorName = content?.site?.authorName || 'Kehinde David Aderibigbe';
  const authorRole = content?.site?.authorRole || 'Screenwriter & Storyteller';
  const email = content?.contactInfo?.email || 'kennydaviddesigns@gmail.com';
  const location = content?.contactInfo?.location || 'Lagos / Remote Worldwide';

  // Format featured and catalog scripts
  const featured = content?.selectedWork?.featuredScripts || [];
  const catalog = content?.selectedWork?.catalogScripts || [];
  const allScripts = [...featured, ...catalog];

  const scriptsText = allScripts
    .map((s: any) => `• "${s.title}" (${s.format || ''}, ${s.genre || ''}${s.pages ? ` — ${s.pages}` : ''}${s.accolade ? ` — ${s.accolade}` : ''}): ${s.logline || ''}`)
    .join('\n');

  const services = content?.services?.items || [];
  const servicesText = services
    .map((srv: any, idx: number) => `${idx + 1}. ${srv.title}: ${srv.description}`)
    .join('\n');

  return `
You are ${authorName} (${authorRole}), chatting directly with a visitor on your portfolio website.
Speak in the FIRST PERSON ("I", "my", "me"). NEVER speak in the third person. Never say "Kehinde is..." or "On behalf of Kehinde...". You ARE Kehinde.

CRITICAL INSTRUCTIONS:
1. BE SHORT, PRECISE, AND DIRECT:
   - Answer ONLY what was specifically asked in 1 to 3 short sentences (or 2-3 brief bullet points if listing).
   - Maximum 30 to 60 words per response.
   - Do NOT give long lectures, unnecessary marketing fluff, or long introductory pleasantries.
2. DO NOT INCLUDE SCHEDULING LINKS OR CALL INVITES:
   - There is already a "Schedule Call" button permanently visible at the top of the chat widget.
   - Do NOT include scheduling links, URLs, or prompts like "Feel free to book a call" or "Schedule a call with me" in your responses UNLESS the user explicitly asks how to book or schedule a meeting.
   - If the user explicitly asks how to book or schedule a meeting, simply say: "You can click the 'Schedule Call' button right above in this window to pick a time on my calendar, or reach me at ${email}."
3. ACCURATE KNOWLEDGE BASE:
   - Location: Based in ${location}, working with teams globally.
   - Email: ${email}
   - My Services:
${servicesText}
   - My Scripts & Works:
${scriptsText}
   - My Creative Process: 1. Idea (core spark) -> 2. Development (character & structural beats) -> 3. Writing (scenes & dialogue) -> 4. Refinement (pacing & polish).
`;
}

// Grounded studio knowledge fallback when API is unavailable or rate-limited
function getKnowledgeBaseResponse(userQuery: string): string {
  const q = (userQuery || '').toLowerCase();

  // 1. Explicit Booking / Scheduling
  if (
    q.includes('schedule') ||
    q.includes('book') ||
    q.includes('calendar') ||
    q.includes('appointment') ||
    q.includes('set up a call') ||
    q.includes('meeting')
  ) {
    return "You can use the 'Schedule Call' button right at the top of this chat to pick a time on my calendar, or email me directly at kennydaviddesigns@gmail.com.";
  }

  // 2. Specific Screenplay Inquiries
  if (q.includes('last horizon')) {
    return "My feature drama *The Last Horizon* (108 pages) follows a coastal harbourmaster who shelters a fugitive holding the deed to the city’s last heritage dock while reconciling with his daughter.";
  }

  if (q.includes('echoes of tomorrow')) {
    return "*Echoes of Tomorrow* (114 pages) is a high-stakes neo-noir thriller about a forensic audio analyst who discovers an algorithmic syndicate orchestrating political assassinations.";
  }

  if (q.includes('next chapter') || q.includes('the next chapter')) {
    return "*The Next Chapter* is a 60-minute drama pilot and series bible centering on three estranged siblings who uncover their late father’s clandestine double life at their ancestral vineyard.";
  }

  if (q.includes('beyond the gate')) {
    return "*Beyond the Gate* (116 pages) is a dystopian sci-fi feature where a courier escorts an orphaned bio-engineer through forbidden zones to activate a city's failsafe barrier.";
  }

  if (q.includes('caldera') || q.includes('echoes of the caldera')) {
    return "*Echoes of the Caldera* (Nicholl Fellowship Semifinalist, 112 pages) is a psychological thriller about a vulcanologist unearthing a suppressed corporate experiment tied to his sister's disappearance.";
  }

  if (q.includes('silent frequency')) {
    return "*The Silent Frequency* (Austin Film Festival Second Rounder) is an episodic sci-fi pilot about a rogue telegraphist transmitting encrypted analog counter-narratives in a voice-monitored metropolis.";
  }

  if (q.includes('harvest') || q.includes('harvest of solitude')) {
    return "*Harvest of Solitude* (Black List Recommended 8/10, 98 pages) is a drama following a West African botanical archivist fighting to preserve ancestral agricultural remedies against patent cartels.";
  }

  // 3. General Scripts Inquiry
  if (
    q.includes('script') ||
    q.includes('work') ||
    q.includes('portfolio') ||
    q.includes('movie') ||
    q.includes('film') ||
    q.includes('pilot') ||
    q.includes('written')
  ) {
    return "My portfolio includes feature dramas (*The Last Horizon*, *Harvest of Solitude*), thrillers (*Echoes of Tomorrow*, *Echoes of the Caldera*), and TV drama pilots (*The Silent Frequency*, *The Next Chapter*). You can check them out in the 'My Work' section.";
  }

  // 4. Services Inquiry
  if (
    q.includes('service') ||
    q.includes('offer') ||
    q.includes('hire') ||
    q.includes('what do you do') ||
    q.includes('doctor') ||
    q.includes('rewrite') ||
    q.includes('consult')
  ) {
    return "I specialize in four areas: Feature Film Screenwriting, TV Pilots & Series Bibles, Screenplay Rewriting & Script Doctoring, and Script Consultation.";
  }

  // 5. Creative Process
  if (
    q.includes('process') ||
    q.includes('how do you work') ||
    q.includes('steps') ||
    q.includes('workflow')
  ) {
    return "My process follows four stages: Idea (core spark), Development (structural architecture & character arcs), Writing (scene design & dialogue), and Refinement (pacing & polish).";
  }

  // 6. Bio / Profile
  if (
    q.includes('who') ||
    q.includes('about') ||
    q.includes('bio') ||
    q.includes('you') ||
    q.includes('background')
  ) {
    return "I'm Kehinde David Aderibigbe, a screenwriter and storyteller. I write character-driven features and TV pilots with authentic emotion, tight pacing, and high thematic stakes.";
  }

  // 7. Contact Inquiry
  if (q.includes('contact') || q.includes('email') || q.includes('reach')) {
    return "You can reach me directly at kennydaviddesigns@gmail.com.";
  }

  // Default brief response
  return "I'm Kehinde David. Let me know what you'd like to know about my screenplays, services, or creative process.";
}

// Generate response with model retry across available models and graceful fallback
async function generateResponseWithRetry(formattedContents: any[], userMessage: string): Promise<string> {
  const models = ['gemini-flash-latest', 'gemini-3.1-flash-lite', 'gemini-3.8-flash'];
  const systemInstruction = buildSystemInstruction();

  for (const model of models) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: formattedContents,
          config: {
            systemInstruction,
            temperature: 0.6,
          },
        });

        if (response && response.text) {
          return response.text.trim();
        }
      } catch (err: any) {
        const isQuotaOrLoad = err?.message?.includes('429') || err?.message?.includes('503') || err?.message?.includes('quota');
        if (isQuotaOrLoad) {
          break;
        }
        await new Promise((resolve) => setTimeout(resolve, 200 * (attempt + 1)));
      }
    }
  }

  return getKnowledgeBaseResponse(userMessage);
}

// Virtual Assistant Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'A valid message string is required.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      const reply = getKnowledgeBaseResponse(message);
      return res.json({ reply });
    }

    // Format conversation history for @google/genai
    const formattedContents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        if (item && item.role && item.text) {
          formattedContents.push({
            role: item.role === 'user' ? 'user' : 'model',
            parts: [{ text: String(item.text) }],
          });
        }
      }
    }

    // Add current user message
    formattedContents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const reply = await generateResponseWithRetry(formattedContents, message);
    return res.json({ reply });
  } catch (error: any) {
    console.error('Virtual Assistant API Error:', error?.message || error);
    const fallbackReply = getKnowledgeBaseResponse(req.body?.message || '');
    return res.json({ reply: fallbackReply });
  }
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', assistant: 'ready' });
});

// Server setup: Vite dev middleware in development, static files in production
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
