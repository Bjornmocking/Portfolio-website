import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { MessageSquareText, SendHorizonal, Sparkles, AlertCircle } from 'lucide-react';

type ChatMessage = {
  role: 'user' | 'assistant';
  text: string;
};

const model = (import.meta.env.VITE_GEMINI_MODEL as string | undefined) || 'gemini-flash-latest';

export const GeminiChatbot: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      text: 'Hoi! Ik ben je kleine Gemini-chatbot. Ik gebruik automatisch de API-key uit je .env-bestand.',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt) {
      setError('Typ eerst een bericht.');
      return;
    }

    setLoading(true);
    setError('');

    const userMessage: ChatMessage = { role: 'user', text: trimmedPrompt };
    const assistantPlaceholder: ChatMessage = {
      role: 'assistant',
      text: 'Ik denk na...',
    };

    setMessages((prev) => [...prev, userMessage, assistantPlaceholder]);
    setPrompt('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: trimmedPrompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const message = data?.error || 'Er ging iets mis bij het ophalen van het antwoord.';
        throw new Error(message);
      }

      const answer = data?.answer || 'Ik kon geen antwoord genereren.';

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'assistant', text: answer };
        return updated;
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Er ging iets mis bij het ophalen van het antwoord.';
      setError(message);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          text: 'Er ging iets mis. Controleer je API-key en probeer het opnieuw.',
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="gemini-chatbot-section"
      className="border-b border-neutral-800 bg-neutral-950/60 py-14 sm:py-18"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-500/40 bg-blue-500/10 text-blue-400">
            <MessageSquareText className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400">
              Gemini AI Chatbot
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white">Mini chatbot</h2>
          </div>
        </div>

        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-6 shadow-xl">
          <div className="mb-4 rounded-xl border border-blue-500/30 bg-blue-500/10 px-3 py-2 text-xs text-blue-200">
            Veilig verbonden via je eigen backend.
            {model && (
              <span className="ml-2">Model: {model}</span>
            )}
          </div>

          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          <div className="mb-4 max-h-80 space-y-3 overflow-y-auto rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'border border-neutral-700 bg-neutral-900 text-neutral-200'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Typ je vraag voor Gemini..."
              className="flex-1 rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-sm text-neutral-100 placeholder-neutral-600 focus:border-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-950 transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  <span>Bezig...</span>
                </>
              ) : (
                <>
                  <SendHorizonal className="h-4 w-4" />
                  <span>Verstuur</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
