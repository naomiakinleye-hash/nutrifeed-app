import { useState, useEffect } from 'react';
import './ConsentBanner.css';

const CONSENT_KEY = 'nutrifeed_consent_v1';

function ConsentBanner() {
  const [visible, setVisible]   = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [prefs, setPrefs]       = useState({
    essential:       true,
    analytics:       false,
    personalisation: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_KEY);
    if (!saved) {
      const timer = setTimeout(() => setVisible(true), 700);
      return () => clearTimeout(timer);
    }
  }, []);

  function save(chosenPrefs) {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({
      timestamp: new Date().toISOString(),
      choices: chosenPrefs,
    }));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="consent-banner" role="dialog" aria-modal="true" aria-label="Cookie consent">
      <div className="consent-inner">
        <div className="consent-top">
          <p className="consent-title">We respect your privacy</p>
          <p className="consent-body">
            NutriFeed uses cookies to make the app work and, optionally, to
            understand how farmers use the calculator. We never sell your data.{' '}
            <a href="/privacy" className="consent-link">Privacy Policy</a>
          </p>
        </div>
        {expanded && (
          <div className="consent-options">
            <ConsentRow
              label="Essential"
              description="Required for login and navigation. Cannot be disabled."
              checked={prefs.essential}
              disabled
            />
            <ConsentRow
              label="Usage Analytics"
              description="Anonymous data on which features farmers use most."
              checked={prefs.analytics}
              onChange={() => setPrefs(p => ({ ...p, analytics: !p.analytics }))}
            />
            <ConsentRow
              label="Personalisation"
              description="Saves your calculator preferences between visits."
              checked={prefs.personalisation}
              onChange={() => setPrefs(p => ({ ...p, personalisation: !p.personalisation }))}
            />
          </div>
        )}
        <div className="consent-actions">
          <button
            className="consent-btn consent-btn--reject"
            onClick={() => save({ essential: true, analytics: false, personalisation: false })}
          >
            Essential only
          </button>
          {!expanded ? (
            <button className="consent-btn consent-btn--manage" onClick={() => setExpanded(true)}>
              Manage
            </button>
          ) : (
            <button className="consent-btn consent-btn--manage" onClick={() => save(prefs)}>
              Save choices
            </button>
          )}
          <button
            className="consent-btn consent-btn--accept"
            onClick={() => save({ essential: true, analytics: true, personalisation: true })}
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}

function ConsentRow({ label, description, checked, disabled, onChange }) {
  return (
    <div className={`consent-row ${disabled ? 'consent-row--disabled' : ''}`}>
      <div className="consent-row-text">
        <span className="consent-row-label">{label}</span>
        {disabled && <span className="consent-row-badge">Always on</span>}
        <p className="consent-row-desc">{description}</p>
      </div>
      <label className="consent-toggle-label">
        <input
          type="checkbox"
          className="consent-toggle-input"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
        />
        <span className="consent-toggle-track" />
      </label>
    </div>
  );
}

export default ConsentBanner;