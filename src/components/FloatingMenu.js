import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FloatingMenu.css';

const LANGUAGES = [
  { code: 'EN', label: 'English' },
  { code: 'YO', label: 'Yoruba' },
  { code: 'IG', label: 'Igbo' },
  { code: 'HA', label: 'Hausa' },
];

function FloatingMenu() {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [activePanel, setActivePanel] = useState(null);
  const navigate                      = useNavigate();

  function openPanel(panel) {
    if (panel === 'profile') {
      setMenuOpen(false);
      navigate('/profile');
      return;
    }
    setActivePanel(panel);
    setMenuOpen(false);
  }

  function closeAll() {
    setMenuOpen(false);
    setActivePanel(null);
  }

  return (
    <>
      {(menuOpen || activePanel) && (
        <div className="fm-backdrop" onClick={closeAll} />
      )}

      <div className="fm-wrapper">

        {menuOpen && (
          <div className="fm-popup">
            <button className="fm-popup-item" onClick={() => openPanel('profile')}>
              Profile
            </button>
            <button className="fm-popup-item" onClick={() => openPanel('settings')}>
              Settings
            </button>
            <button className="fm-popup-item" onClick={() => openPanel('language')}>
              Language
            </button>
            <button className="fm-popup-item" onClick={() => openPanel('help')}>
              Get Help
            </button>
          </div>
        )}

        <button
          className={`fm-button ${menuOpen ? 'fm-button--open' : ''}`}
          onClick={() => { setMenuOpen(o => !o); setActivePanel(null); }}
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          <span className="fm-bar" />
          <span className="fm-bar" />
          <span className="fm-bar" />
        </button>

      </div>

      {activePanel === 'settings' && <SettingsPanel onClose={closeAll} />}
      {activePanel === 'language' && <LanguagePanel onClose={closeAll} />}
      {activePanel === 'help'     && <HelpPanel     onClose={closeAll} />}
    </>
  );
}

/* ── SETTINGS PANEL ──────────────────────────────────────────────────────── */
function SettingsPanel({ onClose }) {
  const [settings, setSettings] = useState({
    feedAlerts:   true,
    weeklyReport: false,
  });

  function toggle(key) {
    setSettings(s => ({ ...s, [key]: !s[key] }));
  }

  return (
    <div className="fm-panel">
      <div className="fm-panel-header">
        <h2 className="fm-panel-title">Settings</h2>
        <button className="fm-panel-close" onClick={onClose} aria-label="Close">&#x2715;</button>
      </div>

      <div className="fm-panel-form">
        <p className="fm-panel-section">Notifications</p>

        <SettingsRow
          label="Feed stock alerts"
          description="Get notified when feed stock is running low."
          checked={settings.feedAlerts}
          onChange={() => toggle('feedAlerts')}
        />
        <SettingsRow
          label="Weekly farm report"
          description="Receive a summary of your farm metrics every week."
          checked={settings.weeklyReport}
          onChange={() => toggle('weeklyReport')}
        />

        <p className="fm-panel-section">Privacy</p>

        <div className="fm-settings-link-row">
          <a href="/privacy" className="fm-settings-link" onClick={onClose}>
            View Privacy Policy
          </a>
        </div>
        <div className="fm-settings-link-row">
          <button
            className="fm-settings-link"
            onClick={() => {
              localStorage.removeItem('nutrifeed_consent_v1');
              onClose();
              window.location.reload();
            }}
          >
            Reset cookie preferences
          </button>
        </div>

        <p className="fm-panel-section">Account</p>

        <div className="fm-settings-link-row">
          <button className="fm-settings-link fm-settings-link--danger">
            Delete my account
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingsRow({ label, description, checked, onChange }) {
  return (
    <div className="fm-settings-row">
      <div className="fm-settings-text">
        <p className="fm-settings-label">{label}</p>
        <p className="fm-settings-desc">{description}</p>
      </div>
      <label className="fm-toggle-label">
        <input
          type="checkbox"
          className="fm-toggle-input"
          checked={checked}
          onChange={onChange}
        />
        <span className="fm-toggle-track" />
      </label>
    </div>
  );
}

/* ── LANGUAGE PANEL ──────────────────────────────────────────────────────── */
function LanguagePanel({ onClose }) {
  const [selected, setSelected] = useState('EN');

  return (
    <div className="fm-panel">
      <div className="fm-panel-header">
        <h2 className="fm-panel-title">Language</h2>
        <button className="fm-panel-close" onClick={onClose} aria-label="Close">&#x2715;</button>
      </div>

      <div className="fm-panel-form">
        <p className="fm-panel-section">Select your preferred language</p>

        <div className="fm-lang-grid">
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              className={`fm-lang-btn ${selected === lang.code ? 'fm-lang-btn--active' : ''}`}
              onClick={() => setSelected(lang.code)}
            >
              <span className="fm-lang-code">{lang.code}</span>
              <span className="fm-lang-label">{lang.label}</span>
            </button>
          ))}
        </div>

        <p className="fm-lang-note">
          Full translation coming soon. The app currently runs in English.
        </p>

        <div className="fm-panel-actions">
          <button className="fm-btn fm-btn--primary" onClick={onClose}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

/* ── HELP PANEL ──────────────────────────────────────────────────────────── */
function HelpPanel({ onClose }) {
  const [form, setForm]           = useState({ subject: '', message: '' });
  const [errors, setErrors]       = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    if (!form.subject) newErrors.subject = 'Please select a subject';
    if (!form.message.trim()) newErrors.message = 'Please write a message';
    else if (form.message.trim().length < 10) newErrors.message = 'Message is too short';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="fm-panel">
        <div className="fm-panel-header">
          <h2 className="fm-panel-title">Get Help</h2>
          <button className="fm-panel-close" onClick={onClose} aria-label="Close">&#x2715;</button>
        </div>
        <div className="fm-panel-form">
          <div className="fm-submitted">
            <p className="fm-submitted-title">Message sent</p>
            <p className="fm-submitted-body">
              Thank you for reaching out. We will get back to you within 48 hours.
            </p>
            <button className="fm-btn fm-btn--primary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fm-panel">
      <div className="fm-panel-header">
        <h2 className="fm-panel-title">Get Help</h2>
        <button className="fm-panel-close" onClick={onClose} aria-label="Close">&#x2715;</button>
      </div>

      <form onSubmit={handleSubmit} className="fm-panel-form" noValidate>
        <p className="fm-panel-section">Send us a message</p>

        <div className="fm-field">
          <label htmlFor="fh-subject">Subject</label>
          <select
            id="fh-subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            aria-invalid={errors.subject ? 'true' : 'false'}
          >
            <option value="">Select a subject</option>
            <option value="calculator">Question about the calculator</option>
            <option value="feed">Question about BSF feed</option>
            <option value="account">Account or login issue</option>
            <option value="complaint">Complaint</option>
            <option value="feedback">General feedback</option>
            <option value="other">Other</option>
          </select>
          {errors.subject && (
            <p className="field-error" role="alert">{errors.subject}</p>
          )}
        </div>

        <div className="fm-field">
          <label htmlFor="fh-message">Message</label>
          <textarea
            id="fh-message"
            name="message"
            rows={5}
            placeholder="Describe your question or issue..."
            value={form.message}
            onChange={handleChange}
            aria-invalid={errors.message ? 'true' : 'false'}
          />
          {errors.message && (
            <p className="field-error" role="alert">{errors.message}</p>
          )}
        </div>

        <div className="fm-panel-actions">
          <button type="submit" className="fm-btn fm-btn--primary">Send message</button>
        </div>
      </form>
    </div>
  );
}

export default FloatingMenu;
