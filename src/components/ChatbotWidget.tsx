import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  Calendar,
  RotateCcw,
  Bot,
  ChevronDown,
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface ChatbotWidgetProps {
  onOpenBooking: () => void;
  onOpenContact: () => void;
  onOpenWorkPreview?: () => void;
}

const DEFAULT_SUGGESTIONS = [
  'What services do you offer?',
  'Tell me about your scripts',
  'What is your creative process?',
  'How do I schedule a call?',
];

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  onOpenBooking,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Hi, I'm Kehinde David. How can I help you with my screenplays, services, or stories today?",
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasOpenedOnce(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, messages]);

  // Client-side grounded concise first-person fallback
  const getClientSideAnswer = (query: string): string => {
    const q = query.toLowerCase();

    if (
      q.includes('schedule') ||
      q.includes('book') ||
      q.includes('calendar') ||
      q.includes('call') ||
      q.includes('appointment') ||
      q.includes('meeting')
    ) {
      return "You can click the 'Schedule Call' button right at the top of this window to pick a time on my calendar, or email me at kennydaviddesigns@gmail.com.";
    }

    if (
      q.includes('service') ||
      q.includes('offer') ||
      q.includes('hire') ||
      q.includes('what do you do') ||
      q.includes('doctor') ||
      q.includes('rewrite') ||
      q.includes('consult')
    ) {
      return "I specialize in four key areas: Feature Film Screenwriting, TV Pilots & Series Bibles, Screenplay Rewriting & Script Doctoring, and Script Consultation.";
    }

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

    if (
      q.includes('process') ||
      q.includes('how do you work') ||
      q.includes('steps') ||
      q.includes('workflow')
    ) {
      return "My process follows four stages: Idea (core spark), Development (structural architecture & character arcs), Writing (scene design & dialogue), and Refinement (pacing & polish).";
    }

    if (
      q.includes('who') ||
      q.includes('about') ||
      q.includes('bio') ||
      q.includes('you') ||
      q.includes('background')
    ) {
      return "I'm Kehinde David Aderibigbe, a screenwriter and storyteller. I write character-driven features and TV pilots focused on authentic emotion, tight pacing, and high thematic stakes.";
    }

    if (q.includes('contact') || q.includes('email') || q.includes('reach')) {
      return "You can reach me directly at kennydaviddesigns@gmail.com.";
    }

    return "I'm Kehinde David. Let me know what you'd like to know about my screenplays, services, or creative process.";
  };

  const handleSendMessage = async (textToSend?: string) => {
    const message = (textToSend || inputMessage).trim();
    if (!message || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          history: historyPayload,
        }),
      });

      const data = await res.json().catch(() => ({}));
      const replyText = data.reply || getClientSideAnswer(message);

      const assistantReply: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantReply]);
    } catch (err: any) {
      console.warn('Network issue handled smoothly with local story engine:', err);
      const answer = getClientSideAnswer(message);
      const fallbackReply: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        text: "Chat cleared. What can I help you with?",
        timestamp: 'Just now',
      },
    ]);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Expanded Chatbot Window */}
      {isOpen && (
        <div
          id="virtual-assistant-window"
          className="w-[92vw] sm:w-[380px] md:w-[390px] h-[520px] max-h-[80vh] flex flex-col bg-[#101217] border border-stone-700/80 rounded-2xl shadow-2xl overflow-hidden mb-3 animate-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="flex-shrink-0 px-4 py-3 bg-[#0a0c10] border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#d69622] to-[#F3B544] flex items-center justify-center text-[#120E0A] shadow-sm font-bold text-xs">
                  KD
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#0a0c10]" />
              </div>
              <div>
                <h3 className="font-serif-display text-sm font-semibold text-neutral-100">
                  Kehinde David
                </h3>
                <p className="text-[10.5px] text-stone-400">
                  Screenwriter &amp; Storyteller
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              {/* Reset button */}
              <button
                type="button"
                onClick={handleResetChat}
                title="Reset conversation"
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Minimize / Close */}
              <button
                id="close-assistant-btn"
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                aria-label="Minimize assistant"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Top Quick Schedule Call Ribbon */}
          <div className="flex-shrink-0 px-3.5 py-2 bg-[#141820] border-b border-stone-800/80 flex items-center justify-between text-[11px]">
            <span className="text-stone-300 flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#F3B544]" />
              1-on-1 Discovery Consultation
            </span>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onOpenBooking();
              }}
              className="px-2.5 py-1 rounded-full bg-[#F3B544] hover:bg-[#ffbe4d] text-[#120E0A] font-semibold text-[10.5px] transition-all cursor-pointer shadow-sm active:scale-95"
            >
              Schedule Call
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 bg-[#0b0d11]">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm ${
                      isUser
                        ? 'bg-[#d69622] text-[#120E0A] font-medium rounded-br-xs'
                        : 'bg-[#181b22] text-stone-200 border border-stone-700/60 rounded-bl-xs'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                  <span className="text-[9.5px] text-stone-500 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center space-x-2 text-stone-400 text-xs py-1">
                <div className="w-6 h-6 rounded-full bg-[#181b22] border border-stone-700 flex items-center justify-center text-[#F3B544]">
                  <Sparkles className="w-3 h-3 animate-pulse" />
                </div>
                <div className="flex space-x-1 items-center bg-[#181b22] px-3 py-2 rounded-2xl border border-stone-700/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F3B544] animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F3B544] animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F3B544] animate-bounce" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="flex-shrink-0 px-3 py-2 bg-[#0d0f14] border-t border-stone-800/80 overflow-x-auto scrollbar-none flex gap-1.5">
            {DEFAULT_SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleSendMessage(suggestion)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-[#181a20] hover:bg-stone-800 border border-stone-700/70 hover:border-[#F3B544]/60 text-stone-300 hover:text-white text-[10.5px] transition-colors cursor-pointer"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="flex-shrink-0 p-3 bg-[#0a0c10] border-t border-stone-800 flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              disabled={isLoading}
              className="flex-1 bg-[#16181f] border border-stone-700 rounded-full px-3.5 py-2 text-xs text-neutral-100 placeholder-stone-500 focus:outline-none focus:border-[#F3B544] transition-colors"
            />
            <button
              id="send-assistant-message-btn"
              type="button"
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isLoading}
              className="w-8 h-8 rounded-full bg-[#F3B544] hover:bg-[#ffbe4d] disabled:opacity-40 disabled:hover:bg-[#F3B544] text-[#120E0A] flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-sm active:scale-95"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <div className="relative flex items-center">
        {/* Subtle tooltip invitation bubble if not yet opened */}
        {!isOpen && !hasOpenedOnce && (
          <div
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 mr-3 px-3 py-1.5 rounded-full bg-[#16181f] border border-[#F3B544]/40 text-neutral-100 text-xs shadow-lg cursor-pointer hover:border-[#F3B544] transition-all animate-bounce duration-1000"
          >
            <Sparkles className="w-3 h-3 text-[#F3B544]" />
            <span className="font-medium text-[11.5px]">Chat with Kehinde</span>
          </div>
        )}

        <button
          id="toggle-virtual-assistant-btn"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-gradient-to-tr from-[#d69622] via-[#F3B544] to-[#fce39e] text-[#120E0A] shadow-xl hover:shadow-[#F3B544]/25 transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer border border-[#fce39e]/50"
          aria-label={isOpen ? 'Close chat' : 'Chat with Kehinde'}
        >
          {isOpen ? (
            <X className="w-5 h-5 text-[#120E0A]" />
          ) : (
            <>
              <Bot className="w-6 h-6 text-[#120E0A] group-hover:rotate-6 transition-transform" />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F3B544] opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-[#120E0A]" />
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
