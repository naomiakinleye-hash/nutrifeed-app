import { useState } from 'react';
import './TransparencyNotice.css';

const NOTICE_CONTENT = {
  calculator: {
    summary: 'Your calculation stays on your device unless you are logged in.',
    details: [
      'Results are saved to your browser only, not our servers, unless you have an account.',
      'If you log in, calculation history is used to personalise your feed recommendations.',
      'We never share individual farm data with third parties.',
      'You can delete your history any time from your Profile page.',
    ],
  },
  signup: {
    summary: 'We collect only what is needed to create your account.',
    details: [
      'Email: used only for login and important account notifications.',
      'Password: stored as a secure hash — we cannot read it.',
      'Farm details are optional and used only to personalise feed recommendations.',
      'We do not sell your data or use it for advertising.',
    ],
  },
};

function TransparencyNotice({ context = 'calculator' }) {
  const [open, setOpen] = useState(false);
  const content = NOTICE_CONTENT[context];

  if (!content) return null;

  return (
    <div className="transparency-notice">
      <div className="tn-summary-row">
        <p className="tn-summary">{content.summary}</p>
        <button
          type="button"
          className="tn-toggle"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
        >
          {open ? 'Hide details' : 'How we use this'}
        </button>
      </div>

      {open && (
        <ul className="tn-details">
          {content.details.map((line, i) => (
            <li key={i} className="tn-detail-item">{line}</li>
          ))}
          <li className="tn-detail-link">
            <a href="/privacy">Read the full Privacy Policy</a>
          </li>
        </ul>
      )}
    </div>
  );
}

export default TransparencyNotice;