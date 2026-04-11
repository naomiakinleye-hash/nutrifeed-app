import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Privacy.css';

function Privacy() {
  const navigate = useNavigate();
  const { t }    = useTranslation();

  const SECTIONS = [
    { id: 1, tag: t('privacy.section1_tag'), title: t('privacy.section1_title'), body: t('privacy.section1_body') },
    { id: 2, tag: t('privacy.section2_tag'), title: t('privacy.section2_title'), body: t('privacy.section2_body') },
    { id: 3, tag: t('privacy.section3_tag'), title: t('privacy.section3_title'), body: t('privacy.section3_body') },
    { id: 4, tag: t('privacy.section4_tag'), title: t('privacy.section4_title'), body: t('privacy.section4_body') },
    { id: 5, tag: t('privacy.section5_tag'), title: t('privacy.section5_title'), body: t('privacy.section5_body') },
    { id: 6, tag: t('privacy.section6_tag'), title: t('privacy.section6_title'), body: t('privacy.section6_body') },
  ];

  return (
    <div className="privacy-page">

      <div className="privacy-header">
        <p className="privacy-eyebrow">{t('privacy.eyebrow')}</p>
        <h1>{t('privacy.title')}</h1>
        <p>{t('privacy.subtitle')}</p>
        <p className="privacy-updated">{t('privacy.updated')}</p>
      </div>

      <div className="privacy-summary-title">{t('privacy.short_version')}</div>
      <div className="privacy-summary-grid">
        <div className="privacy-summary-card">
          <p className="privacy-summary-label">{t('privacy.summary1_title')}</p>
          <p className="privacy-summary-note">{t('privacy.summary1_note')}</p>
        </div>
        <div className="privacy-summary-card">
          <p className="privacy-summary-label">{t('privacy.summary2_title')}</p>
          <p className="privacy-summary-note">{t('privacy.summary2_note')}</p>
        </div>
        <div className="privacy-summary-card">
          <p className="privacy-summary-label">{t('privacy.summary3_title')}</p>
          <p className="privacy-summary-note">{t('privacy.summary3_note')}</p>
        </div>
        <div className="privacy-summary-card">
          <p className="privacy-summary-label">{t('privacy.summary4_title')}</p>
          <p className="privacy-summary-note">{t('privacy.summary4_note')}</p>
        </div>
      </div>

      <div className="privacy-section-title">{t('privacy.full_policy')}</div>
      <div className="privacy-grid">
        {SECTIONS.map(s => (
          <article className="policy-card" key={s.id}>
            <span className="policy-tag">{s.tag}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </article>
        ))}
      </div>

      <div className="privacy-trust">
        <h2>{t('privacy.manage_title')}</h2>
        <p>{t('privacy.manage_body')}</p>
        <div className="privacy-trust-actions">
          <button
            className="privacy-btn privacy-btn--primary"
            onClick={() => {
              localStorage.removeItem('nutrifeed_consent_v1');
              alert(t('privacy.reset_alert'));
            }}
          >
            {t('privacy.reset_btn')}
          </button>
          <button
            className="privacy-btn privacy-btn--secondary"
            onClick={() => navigate('/dashboard')}
          >
            {t('privacy.back_btn')}
          </button>
        </div>
      </div>

    </div>
  );
}

export default Privacy;