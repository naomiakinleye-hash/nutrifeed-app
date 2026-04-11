import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

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
          <p className="consent-title">{t('consent.title')}</p>
          <p className="consent-body">
            {t('consent.body')}{' '}
            <a href="/privacy" className="consent-link">Privacy Policy</a>
          </p>
        </div>

        {expanded && (
          <div className="consent-options">
            <ConsentRow
              label={t('consent.essential_label')}
              description={t('consent.essential_desc')}
              badge={t('consent.always_on')}
              checked={prefs.essential}
              disabled
            />
            <ConsentRow
              label={t('consent.analytics_label')}
              description={t('consent.analytics_desc')}
              checked={prefs.analytics}
              onChange={() => setPrefs(p => ({ ...p, analytics: !p.analytics }))}
            />
            <ConsentRow
              label={t('consent.personalisation_label')}
              description={t('consent.personalisation_desc')}
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
            {t('consent.essential_only')}
          </button>

          {!expanded ? (
            <button className="consent-btn consent-btn--manage" onClick={() => setExpanded(true)}>
              {t('consent.manage')}
            </button>
          ) : (
            <button className="consent-btn consent-btn--manage" onClick={() => save(prefs)}>
              {t('consent.save_choices')}
            </button>
          )}

          <button
            className="consent-btn consent-btn--accept"
            onClick={() => save({ essential: true, analytics: true, personalisation: true })}
          >
            {t('consent.accept_all')}
          </button>
        </div>

      </div>
    </div>
  );
}

function ConsentRow({ label, description, badge, checked, disabled, onChange }) {
  return (
    <div className={`consent-row ${disabled ? 'consent-row--disabled' : ''}`}>
      <div className="consent-row-text">
        <span className="consent-row-label">{label}</span>
        {disabled && <span className="consent-row-badge">{badge}</span>}
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