import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './FloatingMenu.css';

const LANGUAGES = [
  { code: 'en', label: 'English',  display: 'EN' },
  { code: 'yo', label: 'Yoruba',   display: 'YO' },
  { code: 'ig', label: 'Igbo',     display: 'IG' },
  { code: 'ha', label: 'Hausa',    display: 'HA' },
];

function FloatingMenu() {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [activePanel, setActivePanel] = useState(null);
  const navigate                      = useNavigate();
  const { t }                         = useTranslation();

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
              {t('floating.profile')}
            </button>
            <button className="fm-popup-item" onClick={() => openPanel('settings')}>
              {t('floating.settings')}
            </button>
            <button className="fm-popup-item" onClick={() => openPanel('language')}>
              {t('floating.language')}
            </button>
            <button className="fm-popup-item" onClick={() => openPanel('help')}>
              {t('floating.help')}
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
  const { t } = useTranslation();
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
        <h2 className="fm-panel-title">{t('settings.title')}</h2>
        <button className="fm-panel-close" onClick={onClose} aria-label="Close">&#x2715;</button>
      </div>
      <div className="fm-panel-form">
        <p className="fm-panel-section">{t('settings.notifications')}</p>
        <SettingsRow
          label={t('settings.feed_alerts')}
          description={t('settings.feed_alerts_desc')}
          checked={settings.feedAlerts}
          onChange={() => toggle('feedAlerts')}
        />
        <SettingsRow
          label={t('settings.weekly_report')}
          description={t('settings.weekly_report_desc')}
          checked={settings.weeklyReport}
          onChange={() => toggle('weeklyReport')}
        />
        <p className="fm-panel-section">{t('settings.privacy')}</p>
        <div className="fm-settings-link-row">
          <a href="/privacy" className="fm-settings-link" onClick={onClose}>
            {t('settings.view_privacy')}
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
            {t('settings.reset_cookies')}
          </button>
        </div>
        <p className="fm-panel-section">{t('settings.account')}</p>
        <div className="fm-settings-link-row">
          <button className="fm-settings-link fm-settings-link--danger">
            {t('settings.delete_account')}
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
        <input type="checkbox" className="fm-toggle-input" checked={checked} onChange={onChange} />
        <span className="fm-toggle-track" />
      </label>
    </div>
  );
}

/* ── LANGUAGE PANEL ──────────────────────────────────────────────────────── */
function LanguagePanel({ onClose }) {
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = useState(i18n.language);

  function handleConfirm() {
    i18n.changeLanguage(selected);
    localStorage.setItem('nutrifeed_language', selected);
    onClose();
  }

  return (
    <div className="fm-panel">
      <div className="fm-panel-header">
        <h2 className="fm-panel-title">{t('language.title')}</h2>
        <button className="fm-panel-close" onClick={onClose} aria-label="Close">&#x2715;</button>
      </div>
      <div className="fm-panel-form">
        <p className="fm-panel-section">{t('language.select')}</p>
        <div className="fm-lang-grid">
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              className={`fm-lang-btn ${selected === lang.code ? 'fm-lang-btn--active' : ''}`}
              onClick={() => setSelected(lang.code)}
            >
              <span className="fm-lang-code">{lang.display}</span>
              <span className="fm-lang-label">{lang.label}</span>
            </button>
          ))}
        </div>
        <p className="fm-lang-note">{t('language.coming_soon')}</p>
        <div className="fm-panel-actions">
          <button className="fm-btn fm-btn--primary" onClick={handleConfirm}>
            {t('language.confirm')}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── HELP PANEL ──────────────────────────────────────────────────────────── */
function HelpPanel({ onClose }) {
  const { t }                     = useTranslation();
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
    if (!form.subject) newErrors.subject = t('help.subject_placeholder');
    if (!form.message.trim()) newErrors.message = 'Please write a message';
    else if (form.message.trim().length < 10) newErrors.message = 'Message is too short';
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="fm-panel">
        <div className="fm-panel-header">
          <h2 className="fm-panel-title">{t('help.title')}</h2>
          <button className="fm-panel-close" onClick={onClose} aria-label="Close">&#x2715;</button>
        </div>
        <div className="fm-panel-form">
          <div className="fm-submitted">
            <p className="fm-submitted-title">{t('help.sent_title')}</p>
            <p className="fm-submitted-body">{t('help.sent_body')}</p>
            <button className="fm-btn fm-btn--primary" onClick={onClose}>{t('help.close')}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fm-panel">
      <div className="fm-panel-header">
        <h2 className="fm-panel-title">{t('help.title')}</h2>
        <button className="fm-panel-close" onClick={onClose} aria-label="Close">&#x2715;</button>
      </div>
      <form onSubmit={handleSubmit} className="fm-panel-form" noValidate>
        <p className="fm-panel-section">{t('help.send_message')}</p>
        <div className="fm-field">
          <label htmlFor="fh-subject">{t('help.subject_label')}</label>
          <select id="fh-subject" name="subject" value={form.subject} onChange={handleChange}>
            <option value="">{t('help.subject_placeholder')}</option>
            <option value="calculator">{t('help.subject_calculator')}</option>
            <option value="feed">{t('help.subject_feed')}</option>
            <option value="account">{t('help.subject_account')}</option>
            <option value="complaint">{t('help.subject_complaint')}</option>
            <option value="feedback">{t('help.subject_feedback')}</option>
            <option value="other">{t('help.subject_other')}</option>
          </select>
          {errors.subject && <p className="field-error" role="alert">{errors.subject}</p>}
        </div>
        <div className="fm-field">
          <label htmlFor="fh-message">{t('help.message_label')}</label>
          <textarea
            id="fh-message"
            name="message"
            rows={5}
            placeholder={t('help.message_placeholder')}
            value={form.message}
            onChange={handleChange}
          />
          {errors.message && <p className="field-error" role="alert">{errors.message}</p>}
        </div>
        <div className="fm-panel-actions">
          <button type="submit" className="fm-btn fm-btn--primary">{t('help.send_button')}</button>
        </div>
      </form>
    </div>
  );
}

export default FloatingMenu;