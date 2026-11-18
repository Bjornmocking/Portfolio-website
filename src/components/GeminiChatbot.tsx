import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { MessageSquareText, SendHorizonal, Sparkles, AlertCircle } from 'lucide-react';

type ChatMessage = {
  role: 'user' | 'assistant';
  text: string;
};

interface GeminiChatbotProps {
  onNavigate?: (target: string) => void;
}

const model = (import.meta.env.VITE_GEMINI_MODEL as string | undefined) || 'gemini-flash-lite-latest';

// Vriendelijke labels voor de navigate_to_section functie, gebruikt in het
// bevestigingsbericht dat de chatbot toont zodra hij de pagina laat scrollen.
const NAVIGATION_LABELS: Record<string, string> = {
  hero: 'de homepage',
  'about-me': '"Over mij"',
  sprints: 'het sprintoverzicht',
  'learning-outcomes': 'de leeruitkomsten',
  'sprint-card-1': 'Sprint 1',
  'sprint-card-2': 'Sprint 2',
  'sprint-card-3': 'Sprint 3',
  'sprint-card-4': 'Sprint 4',
  'sprint-card-5': 'Sprint 5',
  'sprint-card-6': 'Sprint 6',
  'sprint-card-7': 'Sprint 7',
  'sprint-card-8': 'Sprint 8',
  'zoeklijst-app': 'de zoeklijst-app',
  tokens: 'de story over tokens',
  dashboard: 'het persoonlijke dashboard',
};

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({ onNavigate }) => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      text: 'Hoi! Ik ben de portfolio-assistent van Bjorn. Vraag me iets over zijn minor, of zeg bijvoorbeeld "laat sprint 1 zien" en ik navigeer er direct naartoe.',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scrol alleen binnen het chatvenster zelf naar het nieuwste bericht,
    // in plaats van scrollIntoView te gebruiken - dat sleept namelijk ook de
    // hele pagina mee, wat botst met een eventuele paginanavigatie hieronder.
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
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

      if (data?.functionCall?.name === 'navigate_to_section') {
        const target = data.functionCall.args?.target as string | undefined;
        const label = (target && NAVIGATION_LABELS[target]) || 'dat onderdeel';

        if (target) {
          onNavigate?.(target);
        }

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: 'assistant',
            text: `Ik breng je naar ${label} 👇`,
          };
          return updated;
        });
        return;
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
      className="border-b border-stone-200 bg-stone-50 py-14 sm:py-18"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-teal-300 bg-teal-50 text-teal-700">
            <MessageSquareText className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-teal-700">
              Gemini AI Chatbot
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-stone-900">Mini chatbot</h2>
          </div>
        </div>

        <div className="rounded-3xl border border-stone-200 bg-white p-4 sm:p-6 shadow-xl">
          <div className="mb-4 rounded-xl border border-teal-300 bg-teal-50 px-3 py-2 text-sm text-teal-700">
            Veilig verbonden via je eigen backend.
            {model && (
              <span className="ml-2">Model: {model}</span>
            )}
          </div>

          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          <div
            ref={messagesContainerRef}
            className="mb-4 max-h-80 space-y-3 overflow-y-auto rounded-2xl border border-stone-200 bg-stone-50 p-4"
          >
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'bg-teal-700 text-white'
                      : 'border border-stone-300 bg-white text-stone-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Vraag iets over Bjorns portfolio..."
              className="flex-1 rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:border-teal-600 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
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
