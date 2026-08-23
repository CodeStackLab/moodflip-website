'use client';

import React, { useState, useRef, useEffect } from 'react';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  time: string;
};

export default function AICoachWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! 👋 I am your MoodFlip AI Coach. How are you feeling right now? Tell me what is on your mind.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const sendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))
        })
      });

      const data = await res.json();
      if (data.success && data.reply) {
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        throw new Error(data.error || 'Failed to generate AI response');
      }
    } catch (err) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Take a deep breath. I am having trouble connecting right now, but remember: you are safe and your feelings are valid. Try again in a moment. 💜',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FLOATING TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 bg-gradient-to-r from-[#7464AC] to-[#9C8CC4] text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all cursor-pointer border border-white/20 group"
        aria-label="Open MoodFlip AI Coach"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
        </span>
        <span className="text-lg">🤖</span>
        <span className="font-extrabold text-xs sm:text-sm tracking-wide">MoodFlip AI</span>
      </button>

      {/* CHAT MODAL */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[380px] h-[520px] max-h-[80vh] bg-[#FEF9F5] rounded-3xl shadow-2xl border border-[#E4DAD7] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* HEADER */}
          <div className="bg-gradient-to-r from-[#1A0A3B] via-[#2D1065] to-[#7464AC] p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FEF9F5]/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-lg">
                🤖
              </div>
              <div>
                <h3 className="font-serif font-extrabold text-sm leading-tight text-white flex items-center gap-1.5">
                  MoodFlip AI Coach
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-black px-1.5 py-0.5 rounded border border-emerald-400/30">ONLINE</span>
                </h3>
                <p className="text-[10px] text-white/75 font-medium">24/7 Mindset Support ✨</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-lg bg-[#FEF9F5]/10 hover:bg-[#FEF9F5]/20 text-white/80 hover:text-white flex items-center justify-center text-sm font-bold transition"
            >
              ✕
            </button>
          </div>

          {/* MESSAGES BODY */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#FEF9F5]/60">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 max-w-[88%] ${m.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5 ${
                    m.role === 'user'
                      ? 'bg-[#7464AC] text-white font-bold'
                      : 'bg-gradient-to-br from-[#7464AC] to-[#9C8CC4] text-white'
                  }`}
                >
                  {m.role === 'user' ? '👤' : '🤖'}
                </div>
                <div>
                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-[#7464AC] text-white rounded-tr-xs font-medium shadow-xs'
                        : 'bg-[#FEF9F5] border border-[#E4DAD7] text-[#1A1338] rounded-tl-xs shadow-xs font-normal'
                    }`}
                  >
                    {m.content}
                  </div>
                  <span className={`text-[9px] text-gray-400 mt-1 block font-medium ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {m.time}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 max-w-[85%]">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7464AC] to-[#9C8CC4] text-white flex items-center justify-center text-xs shrink-0 animate-pulse">
                  🤖
                </div>
                <div className="bg-[#FEF9F5] border border-[#E4DAD7] p-3 rounded-2xl rounded-tl-xs text-xs text-[#5C527A] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#7464AC] animate-ping" />
                  <span>MoodFlip Coach is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* QUICK SUGGESTIONS */}
          {messages.length <= 2 && !loading && (
            <div className="px-3 py-2 bg-[#FEF9F5] border-t border-gray-100 flex gap-1.5 overflow-x-auto text-[10px]">
              <button
                onClick={() => sendMessage("I'm feeling overwhelmed today")}
                className="bg-[#F4EFFC] hover:bg-[#EAE0FD] text-[#7464AC] px-2.5 py-1 rounded-full font-semibold border border-[#D8C8F8] whitespace-nowrap transition cursor-pointer"
              >
                ⚡ Feeling overwhelmed
              </button>
              <button
                onClick={() => sendMessage("Give me a 60-second anxiety reset")}
                className="bg-rose-50 hover:bg-rose-100 text-rose-600 px-2.5 py-1 rounded-full font-semibold border border-rose-200 whitespace-nowrap transition cursor-pointer"
              >
                🫀 60-sec anxiety reset
              </button>
            </div>
          )}

          {/* INPUT FOOTER */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="p-3 bg-[#FEF9F5] border-t border-[#E4DAD7] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask MoodFlip AI anything..."
              className="flex-1 bg-[#FEF9F5] border border-[#E4DAD7] rounded-xl px-3 py-2 text-xs text-[#1A1338] placeholder-gray-400 focus:outline-none focus:border-[#7464AC] font-medium"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="w-9 h-9 rounded-xl bg-[#7464AC] hover:bg-[#7464AC] disabled:opacity-40 text-white flex items-center justify-center text-sm font-bold transition shadow-xs cursor-pointer shrink-0"
            >
              ➔
            </button>
          </form>
        </div>
      )}
    </>
  );
}
