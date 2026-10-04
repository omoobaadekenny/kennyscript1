import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  Calendar,
  RotateCcw,
  ChevronDown,
  User,
  Mail,
  Phone,
  ArrowRight,
  Edit2,
  CheckCircle2,
  LogOut,
  Bot,
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface UserLeadInfo {
  fullName: string;
  firstName: string;
  email: string;
  phone: string;
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

  // User contact lead info state
  const [userInfo, setUserInfo] = useState<UserLeadInfo | null>(() => {
    try {
      const stored = localStorage.getItem('kd_chat_lead');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore storage access errors
    }
    return null;
  });

  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [fullNameInput, setFullNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [messages, setMessages] = useState<Message[]>([]);

  // End-of-chat prompt state
  const [isEndingChat, setIsEndingChat] = useState(false);
  const [isSendingTranscript, setIsSendingTranscript] = useState(false);
  const [endConfirmationText, setEndConfirmationText] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Initialize or re-initialize welcome message once user info is known
  useEffect(() => {
    if (userInfo && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          text: `Hi ${userInfo.firstName}! Nice to meet you. How can I help you with my screenplays, services, or creative process today?`,
          timestamp: 'Just now',
        },
      ]);
    }
  }, [userInfo, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasOpenedOnce(true);
      if (userInfo && !isEditingInfo && !isEndingChat) {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 150);
      }
    }
  }, [isOpen, messages, userInfo, isEditingInfo, isEndingChat]);

  // Handle lead form submission
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    const trimmedName = fullNameInput.trim();
    const trimmedEmail = emailInput.trim();
    const trimmedPhone = phoneInput.trim();

    if (!trimmedName || trimmedName.length < 2) {
      errors.fullName = 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      errors.email = 'Please enter a valid email address.';
    }

    const phoneRegex = /[0-9]{7,}/;
    if (!trimmedPhone || !phoneRegex.test(trimmedPhone.replace(/[^0-9]/g, ''))) {
      errors.phone = 'Please enter a valid phone number (at least 7 digits).';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Extract first name and title case it
    const nameParts = trimmedName.split(/\s+/);
    const rawFirst = nameParts[0] || 'Friend';
    const cleanFirst = rawFirst.charAt(0).toUpperCase() + rawFirst.slice(1).toLowerCase();

    const newLead: UserLeadInfo = {
      fullName: trimmedName,
      firstName: cleanFirst,
      email: trimmedEmail,
      phone: trimmedPhone,
    };

    setUserInfo(newLead);
    setIsEditingInfo(false);
    setFormErrors({});

    try {
      localStorage.setItem('kd_chat_lead', JSON.stringify(newLead));
    } catch {
      // ignore storage errors
    }

    // Reset messages with personalized greeting
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        text: `Hi ${cleanFirst}! Nice to meet you. How can I help you with my screenplays, services, or creative process today?`,
        timestamp: 'Just now',
      },
    ]);
  };

  // Client-side grounded concise first-person fallback
  const getClientSideAnswer = (query: string): string => {
    const q = query.toLowerCase();
    const namePrefix = userInfo?.firstName ? `${userInfo.firstName}, ` : '';

    if (
      q.includes('schedule') ||
      q.includes('book') ||
      q.includes('calendar') ||
      q.includes('call') ||
      q.includes('appointment') ||
      q.includes('meeting')
    ) {
      return `${namePrefix}you can click the 'Schedule Call' button right at the top of this window to pick a time on my calendar, or email me at kennydaviddesigns@gmail.com.`;
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
      return `${namePrefix}I specialize in four key areas: Feature Film Screenwriting, TV Pilots & Series Bibles, Screenplay Rewriting & Script Doctoring, and Script Consultation.`;
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
      return `${namePrefix}my portfolio includes feature dramas (*The Last Horizon*, *Harvest of Solitude*), thrillers (*Echoes of Tomorrow*, *Echoes of the Caldera*), and TV drama pilots (*The Silent Frequency*, *The Next Chapter*). You can check them out in the 'My Work' section.`;
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

    return `${namePrefix ? `Hi ${userInfo?.firstName}! ` : ''}I'm Kehinde David. Let me know what you'd like to know about my screenplays, services, or creative process.`;
  };

  // Check if message signifies end of chat
  const checkIsEndIntent = (text: string) => {
    const lower = text.trim().toLowerCase();
    const endWords = [
      'bye',
      'goodbye',
      'end chat',
      'close chat',
      "that's all",
      "that is all",
      'exit',
      'end conversation',
      'all done',
      'thanks bye',
    ];
    return endWords.some((w) => lower === w || lower.startsWith(w));
  };

  // Handle final completion and transcript forwarding
  const handleFinalizeChat = async (sendToUser: boolean) => {
    if (isSendingTranscript) return;
    setIsSendingTranscript(true);

    try {
      await fetch('/api/chat/end', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userInfo,
          messages,
          sendToUser,
        }),
      });

      if (sendToUser) {
        setEndConfirmationText(
          `A copy of this conversation has been sent to your email (${userInfo?.email}) and forwarded to Kehinde. Thank you!`
        );
        setTimeout(() => {
          setIsEndingChat(false);
          setIsOpen(false);
          setEndConfirmationText(null);
          // Refresh messages for next session
          setMessages([
            {
              id: `welcome-${Date.now()}`,
              role: 'assistant',
              text: `Hi ${userInfo?.firstName || 'friend'}! How can I help you today?`,
              timestamp: 'Just now',
            },
          ]);
        }, 2600);
      } else {
        // If user responds No, immediately close chat
        setIsEndingChat(false);
        setIsOpen(false);
        setEndConfirmationText(null);
        setMessages([
          {
            id: `welcome-${Date.now()}`,
            role: 'assistant',
            text: `Hi ${userInfo?.firstName || 'friend'}! How can I help you today?`,
            timestamp: 'Just now',
          },
        ]);
      }
    } catch (err) {
      console.warn('Transcript dispatch finished with local logging:', err);
      setIsEndingChat(false);
      setIsOpen(false);
      setEndConfirmationText(null);
    } finally {
      setIsSendingTranscript(false);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const message = (textToSend || inputMessage).trim();
    if (!message || isLoading) return;

    // If currently on the end-chat prompt, interpret yes / no directly
    if (isEndingChat) {
      const lower = message.toLowerCase();
      if (['yes', 'yep', 'yeah', 'sure', 'please', 'send', 'ok'].includes(lower)) {
        setInputMessage('');
        handleFinalizeChat(true);
        return;
      }
      if (['no', 'nope', 'nah', 'close', 'cancel'].includes(lower)) {
        setInputMessage('');
        handleFinalizeChat(false);
        return;
      }
    }

    // Check if user says goodbye or wants to end chat
    if (checkIsEndIntent(message)) {
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        text: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, userMessage]);
      setInputMessage('');
      setIsEndingChat(true);
      return;
    }

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
          userInfo: userInfo
            ? {
                fullName: userInfo.fullName,
                firstName: userInfo.firstName,
                email: userInfo.email,
                phone: userInfo.phone,
              }
            : undefined,
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
        text: `Chat cleared. What can I help you with, ${userInfo?.firstName || 'friend'}?`,
        timestamp: 'Just now',
      },
    ]);
    setIsEndingChat(false);
  };

  const startEditInfo = () => {
    if (userInfo) {
      setFullNameInput(userInfo.fullName);
      setEmailInput(userInfo.email);
      setPhoneInput(userInfo.phone);
    }
    setIsEditingInfo(true);
    setIsEndingChat(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Expanded Chatbot Window */}
      {isOpen && (
        <div
          id="virtual-assistant-window"
          className="w-[92vw] sm:w-[390px] md:w-[410px] h-[550px] max-h-[82vh] flex flex-col bg-[#101217] border border-stone-700/80 rounded-2xl shadow-2xl overflow-hidden mb-3 animate-in slide-in-from-bottom-5 duration-200"
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
                <h3 className="font-serif-display text-sm font-semibold text-neutral-100 flex items-center gap-1.5">
                  Kehinde David
                  {userInfo && !isEditingInfo && (
                    <span className="text-[10px] text-stone-400 font-sans font-normal">
                      • {userInfo.firstName}
                    </span>
                  )}
                </h3>
                <p className="text-[10.5px] text-stone-400">
                  Screenwriter &amp; Storyteller
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              {/* End Chat button */}
              {userInfo && !isEditingInfo && !isEndingChat && (
                <button
                  type="button"
                  onClick={() => setIsEndingChat(true)}
                  title="End chat session"
                  className="px-2 py-1 text-[10.5px] font-medium text-stone-300 hover:text-red-300 rounded-lg hover:bg-stone-800/80 border border-stone-700/60 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <LogOut className="w-3 h-3 text-stone-400" />
                  <span>End Chat</span>
                </button>
              )}

              {/* Edit lead details button */}
              {userInfo && !isEditingInfo && (
                <button
                  type="button"
                  onClick={startEditInfo}
                  title="Update your contact info"
                  className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer text-xs flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Reset button */}
              {userInfo && !isEditingInfo && (
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Reset conversation"
                  className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Minimize / Close */}
              <button
                id="close-assistant-btn"
                type="button"
                onClick={() => {
                  if (userInfo && messages.length > 1 && !isEndingChat) {
                    setIsEndingChat(true);
                  } else {
                    setIsOpen(false);
                  }
                }}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                aria-label="Minimize assistant"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* VIEW 1: Pre-chat Intake Form */}
          {(!userInfo || isEditingInfo) ? (
            <div className="flex-1 flex flex-col p-5 bg-[#0b0d11] overflow-y-auto">
              <div className="mb-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F3B544]/15 border border-[#F3B544]/30 text-[#F3B544] text-[10.5px] font-medium mb-2">
                  <Sparkles className="w-3 h-3" />
                  <span>Direct Conversation</span>
                </div>
                <h4 className="font-serif-display text-base font-semibold text-neutral-100">
                  {isEditingInfo ? 'Update Your Information' : 'Before we begin...'}
                </h4>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  Please share your details below so I know who I&apos;m chatting with and can follow up directly.
                </p>
              </div>

              <form onSubmit={handleLeadSubmit} className="space-y-3.5 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Full Name */}
                  <div>
                    <label className="block text-[11px] font-medium text-stone-300 mb-1 flex items-center gap-1">
                      <User className="w-3 h-3 text-[#F3B544]" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={fullNameInput}
                      onChange={(e) => {
                        setFullNameInput(e.target.value);
                        if (formErrors.fullName) {
                          setFormErrors((prev) => ({ ...prev, fullName: '' }));
                        }
                      }}
                      placeholder="e.g. Sarah Jenkins"
                      className={`w-full bg-[#16181f] border rounded-xl px-3.5 py-2.5 text-xs text-neutral-100 placeholder-stone-500 focus:outline-none transition-colors ${
                        formErrors.fullName
                          ? 'border-red-500/80 focus:border-red-500'
                          : 'border-stone-700/80 focus:border-[#F3B544]'
                      }`}
                    />
                    {formErrors.fullName && (
                      <p className="text-[10px] text-red-400 mt-1">{formErrors.fullName}</p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-[11px] font-medium text-stone-300 mb-1 flex items-center gap-1">
                      <Mail className="w-3 h-3 text-[#F3B544]" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => {
                        setEmailInput(e.target.value);
                        if (formErrors.email) {
                          setFormErrors((prev) => ({ ...prev, email: '' }));
                        }
                      }}
                      placeholder="e.g. sarah@production.com"
                      className={`w-full bg-[#16181f] border rounded-xl px-3.5 py-2.5 text-xs text-neutral-100 placeholder-stone-500 focus:outline-none transition-colors ${
                        formErrors.email
                          ? 'border-red-500/80 focus:border-red-500'
                          : 'border-stone-700/80 focus:border-[#F3B544]'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-[10px] text-red-400 mt-1">{formErrors.email}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-[11px] font-medium text-stone-300 mb-1 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#F3B544]" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phoneInput}
                      onChange={(e) => {
                        setPhoneInput(e.target.value);
                        if (formErrors.phone) {
                          setFormErrors((prev) => ({ ...prev, phone: '' }));
                        }
                      }}
                      placeholder="e.g. +1 (555) 019-2834"
                      className={`w-full bg-[#16181f] border rounded-xl px-3.5 py-2.5 text-xs text-neutral-100 placeholder-stone-500 focus:outline-none transition-colors ${
                        formErrors.phone
                          ? 'border-red-500/80 focus:border-red-500'
                          : 'border-stone-700/80 focus:border-[#F3B544]'
                      }`}
                    />
                    {formErrors.phone && (
                      <p className="text-[10px] text-red-400 mt-1">{formErrors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#d69622] to-[#F3B544] hover:from-[#e5a229] hover:to-[#ffc559] text-[#120E0A] font-semibold text-xs transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>{isEditingInfo ? 'Save Details & Continue' : 'Start Chat'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {isEditingInfo && (
                    <button
                      type="button"
                      onClick={() => setIsEditingInfo(false)}
                      className="w-full mt-2 text-center text-[11px] text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          ) : (
            /* VIEW 2: Active Chat Interface (Personalized) */
            <>
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

                {/* END-OF-CHAT PROMPT CARD */}
                {isEndingChat && (
                  <div className="my-3 p-3.5 rounded-2xl bg-gradient-to-b from-[#181c25] to-[#12141a] border border-[#F3B544]/40 shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
                    {endConfirmationText ? (
                      <div className="text-center py-2 space-y-2">
                        <CheckCircle2 className="w-8 h-8 text-[#F3B544] mx-auto animate-bounce" />
                        <p className="text-xs text-stone-200 leading-relaxed font-medium">
                          {endConfirmationText}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#F3B544] font-semibold mb-1">
                          <Mail className="w-3.5 h-3.5" />
                          <span>End of Conversation</span>
                        </div>
                        <h5 className="text-xs font-semibold text-neutral-100 leading-snug">
                          Would you like a copy of this conversation sent to your email address?
                        </h5>
                        <p className="text-[11px] text-stone-400 mt-1 mb-3">
                          Sending to: <span className="text-stone-300 font-mono">{userInfo.email}</span>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            type="button"
                            disabled={isSendingTranscript}
                            onClick={() => handleFinalizeChat(true)}
                            className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-[#d69622] to-[#F3B544] hover:from-[#e5a229] hover:to-[#ffc559] text-[#120E0A] font-semibold text-xs transition-all shadow-sm active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Yes, send copy</span>
                          </button>

                          <button
                            type="button"
                            disabled={isSendingTranscript}
                            onClick={() => handleFinalizeChat(false)}
                            className="flex-1 py-2 px-3 rounded-xl bg-[#20232c] hover:bg-stone-700/80 text-stone-200 border border-stone-600 font-medium text-xs transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>No, close chat</span>
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => setIsEndingChat(false)}
                          className="w-full text-center mt-2.5 text-[10px] text-stone-500 hover:text-stone-300 transition-colors cursor-pointer"
                        >
                          Continue conversation instead
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestions Chips */}
              {!isEndingChat && (
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
              )}

              {/* Input Bar */}
              <div className="flex-shrink-0 p-3 bg-[#0a0c10] border-t border-stone-800 flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    isEndingChat
                      ? 'Type "Yes" or "No"...'
                      : `Ask me anything, ${userInfo.firstName}...`
                  }
                  disabled={isLoading || isSendingTranscript}
                  className="flex-1 bg-[#16181f] border border-stone-700 rounded-full px-3.5 py-2 text-xs text-neutral-100 placeholder-stone-500 focus:outline-none focus:border-[#F3B544] transition-colors"
                />
                <button
                  id="send-assistant-message-btn"
                  type="button"
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || isLoading || isSendingTranscript}
                  className="w-8 h-8 rounded-full bg-[#F3B544] hover:bg-[#ffbe4d] disabled:opacity-40 disabled:hover:bg-[#F3B544] text-[#120E0A] flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-sm active:scale-95"
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          )}
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
