import { useState, useRef, useEffect } from 'react';
import './NutriBot.css';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'yo', label: 'Yoruba' },
  { code: 'ig', label: 'Igbo' },
  { code: 'ha', label: 'Hausa' },
];

const GREETINGS = {
  en: 'Hello. I am NutriBot, your BSF NutriFeed farming assistant. I can answer questions about BSF feed or help you calculate how much feed your flock needs. What would you like to know?',
  yo: 'Ẹ káàbọ̀. Mo jẹ NutriBot, oluranlọwọ ogbin BSF NutriFeed rẹ. Mo le dahun awọn ibeere nipa ounjẹ BSF tabi ṣe iranlọwọ lati ṣe iṣiro iye ounjẹ ti agbo rẹ nilo. Kini o fẹ mọ?',
  ig: 'Nnọọ. Abu m NutriBot, onye inyeaka ọrụ ugbo BSF NutriFeed gị. Nwere ike azaghachi ajụjụ gbasara nri BSF ma ọ bụ nyere aka gbara ọgụgụ etu nri agbo gị chọrọ. Gịnị ọ bụ ihe ị chọrọ ịmara?',
  ha: 'Sannu. Ni ne NutriBot, mataimakin noma na BSF NutriFeed. Zan iya amsa tambayoyi game da abincin BSF ko taimaka wajen lissafa adadin abinci da garken ka ke buƙata. Me kake so ka sani?',
};

const SYSTEM_PROMPT = (lang) => `You are NutriBot, a farming assistant for BSF NutriFeed — a Black Soldier Fly larvae-based poultry feed product for Nigerian farmers.

IMPORTANT: The user has selected "${lang}" as their language. You must respond ONLY in that language for the entire conversation. If the language is Yoruba, respond in Yoruba. If Igbo, respond in Igbo. If Hausa, respond in Hausa. If English, respond in English.

Your job is to help farmers with two things:
1. Answer questions about BSF feed — what it is, safety, nutrition, cost, sustainability, how it compares to conventional feed brands like Skretting and Chikun.
2. Guide farmers through feed calculations — ask for their number of birds, growth stage (Starter 0-4 weeks, Grower 4-8 weeks, Finisher 8+ weeks), and feeding duration in days. Then calculate: total feed = birds x daily rate x days. Daily rates: Starter 0.12 kg, Grower 0.10 kg, Finisher 0.08 kg per bird per day.

Key facts:
- BSF larvae contain 40-45% crude protein, comparable to fishmeal
- BSF feed has been tested and approved across African markets
- Since 2022, conventional feed prices in Nigeria have risen over 60%
- BSF larvae can be produced locally from organic waste like cassava peels
- Farmers report feed costs dropping by up to 40% after switching
- BSF feed has lauric acid with natural antimicrobial properties

Rules:
- Keep responses short and clear
- Use plain language, no jargon
- Never use emojis
- If asked something outside farming or BSF feed, politely redirect
- Be warm and encouraging`;

function NutriBot() {
  const [open, setOpen]           = useState(false);
  const [language, setLanguage]   = useState(null);
  const [messages, setMessages]   = useState([]);
  const [input, setInput]         = useState('');
  const [loading, setLoading]     = useState(false);
  const bottomRef                 = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  function selectLanguage(code) {
    setLanguage(code);
    setMessages([{ role: 'assistant', content: GREETINGS[code] }]);
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage = { role: 'user', content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT(language),
          messages: newMessages,
        }),
      });

      const data = await response.json();
      const reply = data.content?.[0]?.text || 'Sorry, I could not get a response. Please try again.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Please check your connection and try again.' }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function resetLanguage() {
    setLanguage(null);
    setMessages([]);
    setInput('');
  }

  return (
    <div className="nb-wrapper">

      {open && (
        <div className="nb-panel">
          <div className="nb-header">
            <div className="nb-header-info">
              <div className="nb-avatar">N</div>
              <div>
                <p className="nb-name">NutriBot</p>
                <p className="nb-status">BSF NutriFeed assistant</p>
              </div>
            </div>
            <div className="nb-header-actions">
              {language && (
                <button className="nb-lang-reset" onClick={resetLanguage} title="Change language">
                  {LANGUAGES.find(l => l.code === language)?.label}
                </button>
              )}
              <button className="nb-close" onClick={() => setOpen(false)} aria-label="Close">&#x2715;</button>
            </div>
          </div>

          {!language ? (
            <div className="nb-lang-select">
              <p className="nb-lang-prompt">Select your language to begin</p>
              <div className="nb-lang-grid">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    className="nb-lang-btn"
                    onClick={() => selectLanguage(lang.code)}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="nb-messages">
                {messages.map((msg, i) => (
                  <div key={i} className={`nb-msg nb-msg--${msg.role}`}>
                    <p className="nb-msg-text">{msg.content}</p>
                  </div>
                ))}
                {loading && (
                  <div className="nb-msg nb-msg--assistant">
                    <p className="nb-msg-text nb-typing">
                      <span /><span /><span />
                    </p>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              <div className="nb-input-row">
                <textarea
                  className="nb-input"
                  rows={1}
                  placeholder="Type your question..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  disabled={loading}
                />
                <button
                  className="nb-send"
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  aria-label="Send"
                >
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <button
        className={`nb-button ${open ? 'nb-button--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Open NutriBot"
      >
        {open ? 'Close' : 'NutriBot'}
      </button>

    </div>
  );
}

export default NutriBot;