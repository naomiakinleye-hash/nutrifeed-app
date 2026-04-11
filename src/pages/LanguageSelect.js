import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import i18n from '../i18n';
import './LanguageSelect.css';

const LANGUAGES = [
  { code: 'en', name: 'English',  native: 'English' },
  { code: 'yo', name: 'Yoruba',   native: 'Yorùbá' },
  { code: 'ig', name: 'Igbo',     native: 'Igbo' },
  { code: 'ha', name: 'Hausa',    native: 'Hausa' },
];

function LanguageSelect() {
  const navigate             = useNavigate();
  const [selected, setSelected] = useState('en');

  function handleContinue() {
    i18n.changeLanguage(selected);
    localStorage.setItem('nutrifeed_language', selected);
    navigate('/signup');
  }

  return (
    <div className="lang-page">
      <div className="lang-card">

        <p className="lang-brand">BSF NutriFeed</p>
        <h1 className="lang-title">Choose your language</h1>
        <p className="lang-subtitle">
          Select the language you would like to use throughout the app.
          You can change this later from the menu.
        </p>

        <div className="lang-grid">
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              className={`lang-btn ${selected === lang.code ? 'lang-btn--active' : ''}`}
              onClick={() => setSelected(lang.code)}
            >
              <span className="lang-btn-name">{lang.native}</span>
              <span className="lang-btn-sub">{lang.name}</span>
            </button>
          ))}
        </div>

        <button className="lang-continue" onClick={handleContinue}>
          Continue
        </button>

        <p className="lang-login-hint">
          Already have an account?{' '}
          <button
            className="lang-login-link"
            onClick={() => {
              i18n.changeLanguage(selected);
              localStorage.setItem('nutrifeed_language', selected);
              navigate('/login');
            }}
          >
            Log in
          </button>
        </p>

      </div>
    </div>
  );
}

export default LanguageSelect;