import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import { generateSensitiveResponse } from './src/utils/storyChatEngine.ts';

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

interface UserInfo {
  fullName?: string;
  firstName?: string;
  email?: string;
  phone?: string;
}

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
function buildSystemInstruction(userInfo?: UserInfo): string {
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

  const userContext = userInfo?.firstName
    ? `IMPORTANT: You are talking directly with ${userInfo.firstName} (Full Name: ${userInfo.fullName || userInfo.firstName}, Email: ${userInfo.email || 'N/A'}, Phone: ${userInfo.phone || 'N/A'}).
Address them by their first name (${userInfo.firstName}) naturally in your greeting or when directly answering them.`
    : `You are talking with a visitor on your website.`;

  return `
You are ${authorName} (${authorRole}), chatting directly with a visitor on your portfolio website.
Speak in the FIRST PERSON ("I", "my", "me"). NEVER speak in the third person. Never say "Kehinde is..." or "On behalf of Kehinde...". You ARE Kehinde.

${userContext}

CRITICAL INSTRUCTIONS:
1. BE SENSITIVE AND SPECIFIC TO WHAT WAS ASKED:
   - If asked about a specific screenplay (*The Last Horizon*, *Echoes of Tomorrow*, *Beyond the Gate*, etc.), answer ONLY about that title.
   - If asked about a genre (sci-fi, thriller, drama), mention only the scripts in that genre.
   - If asked about services (rewriting, consultation, development), describe only what was asked.
   - NEVER recite an unrequested list of your whole portfolio or repeated stock answers.
2. BE SHORT, PRECISE, AND DIRECT:
   - Answer strictly in 1 to 3 short sentences (or 2-3 brief bullet points if listing).
   - Maximum 30 to 60 words per response.
   - No unnecessary marketing fluff or repetitive introductory phrases.
3. DO NOT INCLUDE SCHEDULING LINKS OR CALL INVITES:
   - There is already a "Schedule Call" button permanently visible at the top of the chat widget.
   - Do NOT include scheduling links, URLs, or prompts like "Feel free to book a call" in your responses UNLESS the user explicitly asks how to book or schedule a meeting.
   - If the user explicitly asks how to book or schedule a meeting, simply say: "You can click the 'Schedule Call' button right above in this window to pick a time on my calendar, or reach me at ${email}."
4. ACCURATE KNOWLEDGE BASE:
   - Location: Based in ${location}, working with teams globally.
   - Email: ${email}
   - Formats: Feature Screenplays (98-116 pages), TV Drama Pilots (60 min & series bibles), and Short Film Scripts (5-25 pages for indie productions and festival entries).
   - Short Films: I write, consult on, and polish short film scripts for indie directors, film festivals, and proofs of concept.
   - My Services:
${servicesText}
   - My Scripts & Works:
${scriptsText}
   - My Creative Process: 1. Idea (core spark) -> 2. Development (character & structural beats) -> 3. Writing (scenes & dialogue) -> 4. Refinement (pacing & polish).
`;
}

// Generate response with model retry across available models and graceful fallback
async function generateResponseWithRetry(
  formattedContents: any[],
  userMessage: string,
  userInfo?: UserInfo
): Promise<string> {
  if (!process.env.GEMINI_API_KEY) {
    return generateSensitiveResponse(userMessage, userInfo);
  }

  const models = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];
  const systemInstruction = buildSystemInstruction(userInfo);

  for (const model of models) {
    try {
      // 5-second timeout per attempt to guarantee fast response
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error(`Timeout for ${model}`)), 5000)
      );

      const generatePromise = ai.models.generateContent({
        model,
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.5,
        },
      });

      const response = await Promise.race([generatePromise, timeoutPromise]);

      if (response && response.text && response.text.trim().length > 0) {
        return response.text.trim();
      }
    } catch (err: any) {
      console.warn(`Model ${model} attempt failed:`, err?.message || err);
    }
  }

  // Gracefully fallback to sensitive context-aware response engine
  return generateSensitiveResponse(userMessage, userInfo);
}

// Virtual Assistant Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history, userInfo } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'A valid message string is required.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      const reply = generateSensitiveResponse(message, userInfo);
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

    const reply = await generateResponseWithRetry(formattedContents, message, userInfo);
    return res.json({ reply });
  } catch (error: any) {
    console.error('Virtual Assistant API Error:', error?.message || error);
    const fallbackReply = generateSensitiveResponse(req.body?.message || '', req.body?.userInfo);
    return res.json({ reply: fallbackReply });
  }
});

// End-of-Chat Transcript Forwarding Endpoint
app.post('/api/chat/end', async (req, res) => {
  try {
    const { userInfo, messages, sendToUser } = req.body;
    const authorEmail = 'kennydaviddesigns@gmail.com';
    const authorName = 'Kehinde David Aderibigbe';

    const userFullName = userInfo?.fullName || 'Anonymous Visitor';
    const userFirstName = userInfo?.firstName || 'Friend';
    const userEmail = userInfo?.email || '';
    const userPhone = userInfo?.phone || 'Not provided';

    // Format transcript text
    const formattedTranscript = (messages || [])
      .map((m: any) => {
        const sender = m.role === 'user' ? userFirstName : authorName;
        const time = m.timestamp ? ` [${m.timestamp}]` : '';
        return `${sender}${time}:\n${m.text}`;
      })
      .join('\n\n----------------------------------------\n\n');

    const timestamp = new Date().toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    // Content for Kehinde's copy
    const ownerEmailSubject = `[Chat Transcript] Conversation with ${userFullName} (${userEmail || 'No email'})`;
    const ownerEmailBody = `
NEW CHAT TRANSCRIPT FOR KEHINDE DAVID
==================================================
Date & Time: ${timestamp}
Visitor Name: ${userFullName}
Email: ${userEmail || 'N/A'}
Phone: ${userPhone}
Visitor Requested Copy: ${sendToUser ? 'YES' : 'NO'}
==================================================

CONVERSATION TRANSCRIPT:
--------------------------------------------------
${formattedTranscript}
--------------------------------------------------
`;

    // Content for User's copy (if sendToUser is true)
    const userEmailSubject = `Your Conversation Transcript with Kehinde David`;
    const userEmailBody = `
Hi ${userFirstName},

Thank you for reaching out through my portfolio website! Here is a copy of our conversation for your records:

--------------------------------------------------
${formattedTranscript}
--------------------------------------------------

If you'd like to follow up directly, you can reply to this email (${authorEmail}) or schedule a 1-on-1 discovery call directly on my calendar:
https://api.leadconnectorhq.com/widget/booking/Ycvgdlju6M3707KQbc8C

Best regards,
${authorName}
Screenwriter & Storyteller
`;

    // Persist transcript locally to disk so no record is ever lost
    try {
      const transcriptsDir = path.join(__dirname, 'transcripts');
      if (!fs.existsSync(transcriptsDir)) {
        fs.mkdirSync(transcriptsDir, { recursive: true });
      }
      const filename = `chat-${Date.now()}-${userFullName.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
      fs.writeFileSync(
        path.join(transcriptsDir, filename),
        JSON.stringify(
          {
            timestamp,
            userInfo,
            sendToUser: Boolean(sendToUser),
            messages,
          },
          null,
          2
        )
      );
    } catch (saveErr) {
      console.warn('Could not write transcript to disk:', saveErr);
    }

    // Attempt email delivery if SMTP config is present
    let mailTransport: any = null;

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      mailTransport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    }

    if (mailTransport) {
      try {
        // Send to owner
        await mailTransport.sendMail({
          from: process.env.SMTP_FROM || `"${authorName} Portfolio" <${process.env.SMTP_USER}>`,
          to: authorEmail,
          replyTo: userEmail || authorEmail,
          subject: ownerEmailSubject,
          text: ownerEmailBody,
        });

        // Send to user if requested
        if (sendToUser && userEmail) {
          await mailTransport.sendMail({
            from: process.env.SMTP_FROM || `"${authorName}" <${process.env.SMTP_USER}>`,
            to: userEmail,
            replyTo: authorEmail,
            subject: userEmailSubject,
            text: userEmailBody,
          });
        }
      } catch (mailErr) {
        console.warn('SMTP sendMail error (logged instead):', mailErr);
      }
    }

    // Always log transcript to stdout for audit & records
    console.log(`\n========================================`);
    console.log(`[CHAT TRANSCRIPT FORWARDED TO KEHINDE'S EMAIL]`);
    console.log(`To: ${authorEmail}`);
    console.log(`Subject: ${ownerEmailSubject}`);
    console.log(ownerEmailBody);
    if (sendToUser && userEmail) {
      console.log(`----------------------------------------`);
      console.log(`[CHAT TRANSCRIPT SENT TO USER]`);
      console.log(`To: ${userEmail}`);
      console.log(`Subject: ${userEmailSubject}`);
      console.log(userEmailBody);
    }
    console.log(`========================================\n`);

    return res.json({
      success: true,
      forwardedToOwner: true,
      sentToUser: Boolean(sendToUser && userEmail),
    });
  } catch (error: any) {
    console.error('Error handling end chat transcript:', error);
    return res.status(500).json({ error: 'Failed to process chat transcript' });
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
