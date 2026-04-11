import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Privacy.css';

function Terms() {
  const navigate = useNavigate();
  const { t }    = useTranslation();

  const SECTIONS = [
    { id: 1, tag: t('terms.section1_tag'), title: t('terms.section1_title'), body: t('terms.section1_body') },
    { id: 2, tag: t('terms.section2_tag'), title: t('terms.section2_title'), body: t('terms.section2_body') },
    { id: 3, tag: t('terms.section3_tag'), title: t('terms.section3_title'), body: t('terms.section3_body') },
    { id: 4, tag: t('terms.section4_tag'), title: t('terms.section4_title'), body: t('terms.section4_body') },
    { id: 5, tag: t('terms.section5_tag'), title: t('terms.section5_title'), body: t('terms.section5_body') },
    { id: 6, tag: t('terms.section6_tag'), title: t('terms.section6_title'), body: t('terms.section6_body') },
    { id: 7, tag: t('terms.section7_tag'), title: t('terms.section7_title'), body: t('terms.section7_body') },
  ];

  return (
    <div className="privacy-page">

      <div className="privacy-header">
        <p className="privacy-eyebrow">{t('terms.eyebrow')}</p>
        <h1>{t('terms.title')}</h1>
        <p>{t('terms.subtitle')}</p>
      </div>

      <div className="privacy-section-title">{t('terms.section_label')}</div>
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
        <h2>{t('terms.cta_title')}</h2>
        <p>{t('terms.cta_body')}</p>
        <div className="privacy-trust-actions">
          <button
            className="privacy-btn privacy-btn--primary"
            onClick={() => navigate('/signup')}
          >
            {t('terms.back_signup')}
          </button>
          <button
            className="privacy-btn privacy-btn--secondary"
            onClick={() => navigate('/privacy')}
          >
            {t('terms.read_privacy')}
          </button>
        </div>
      </div>

    </div>
  );
}

export default Terms;