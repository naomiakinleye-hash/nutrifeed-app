import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './TransparencyNotice.css';

function TransparencyNotice({ context = 'calculator' }) {
  const [open, setOpen] = useState(false);
  const { t }           = useTranslation();

  const summary = t(`transparency.${context}_summary`);
  const details = [
    t(`transparency.${context}_detail1`),
    t(`transparency.${context}_detail2`),
    t(`transparency.${context}_detail3`),
    t(`transparency.${context}_detail4`),
  ].filter(d => d && !d.startsWith('transparency.'));

  return (
    <div className="transparency-notice">
      <div className="tn-summary-row">
        <p className="tn-summary">{summary}</p>
        <button type="button" className="tn-toggle"
          onClick={() => setOpen(o => !o)} aria-expanded={open}>
          {open ? t('transparency.hide') : t('transparency.show')}
        </button>
      </div>

      {open && (
        <ul className="tn-details">
          {details.map((line, i) => (
            <li key={i} className="tn-detail-item">{line}</li>
          ))}
          <li className="tn-detail-link">
            <a href="/privacy">{t('transparency.policy_link')}</a>
          </li>
        </ul>
      )}
    </div>
  );
}

export default TransparencyNotice;