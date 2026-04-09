import { useNavigate } from 'react-router-dom';
import './Privacy.css';

const POLICY_SECTIONS = [
  {
    id: 1,
    tag: 'Data Collection',
    title: 'What We Collect and What We Do Not',
    body: 'If you use the calculator without an account, we store nothing on our servers. Your results are saved only in your browser. If you create an account, we collect your name, email, and password stored as a secure hash we cannot read. Farm details like flock size and feed type are optional and used only to personalise your recommendations. We do not collect your location, financial data, or any information not listed here.',
  },
  {
    id: 2,
    tag: 'Data Usage',
    title: 'Why We Collect It and What We Never Do With It',
    body: 'We use your data for three purposes only: to run your account, to personalise your feed recommendations, and with your consent to understand how the app is used so we can improve it. We never sell your data. We never use it for advertising. We never share it with third parties outside the NutriFeed team. If you withdraw consent at any time, we immediately stop using your data for that purpose.',
  },
  {
    id: 3,
    tag: 'Your Rights',
    title: 'You Are in Full Control of Your Data',
    body: 'Under Nigeria Data Protection Act 2023, you have the right to access a copy of all data we hold about you, correct any inaccuracies, and request full deletion of your account and all associated data. To exercise any of these rights, email privacy@nutrifeed.ng and we will respond within 72 hours. Account deletion is permanent — after a 30-day safety window, your data is fully and irreversibly removed from our systems.',
  },
  {
    id: 4,
    tag: 'Security',
    title: 'How We Protect Your Data',
    body: 'All data in transit between your device and our servers is encrypted with HTTPS. Passwords are stored using bcrypt hashing — a one-way process that means even our own team cannot read your password. The database is accessible only by the development team through audited, secure channels. If there is ever a security incident affecting your data, we will notify you by email within 72 hours and explain exactly what happened and what we did to fix it.',
  },
  {
    id: 5,
    tag: 'Cookies',
    title: 'Cookies We Use',
    body: 'Essential cookies keep you logged in and remember your calculator settings — without them the app cannot function. Analytics cookies are optional and off by default — they help us see which features farmers use most and are fully anonymous. Personalisation cookies are optional and save your language preference and last calculation. We use zero advertising cookies, zero tracking pixels, and zero cross-site fingerprinting of any kind.',
  },
  {
    id: 6,
    tag: 'Contact',
    title: 'Questions, Requests, and Complaints',
    body: 'For any data-related question or request, email privacy@nutrifeed.ng. We aim to respond within 48 hours. If you believe we have handled your data incorrectly, you may also file a complaint with Nigeria Information Technology Development Agency which administers the NDPA 2023. This policy was last updated April 2026. Registered users will be notified by email of any significant changes.',
  },
];

function PolicyCard({ tag, title, body }) {
  return (
    <article className="policy-card">
      <span className="policy-tag">{tag}</span>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="privacy-page">

      <div className="privacy-header">
        <p className="privacy-eyebrow">Privacy Policy</p>
        <h1>Your data belongs to you</h1>
        <p>
          Written in plain language. Compliant with Nigeria Data Protection Act 2023.
        </p>
        <p className="privacy-updated">Last updated: April 2026</p>
      </div>

      <div className="privacy-summary-title">The Short Version</div>
      <div className="privacy-summary-grid">
        <div className="privacy-summary-card">
          <p className="privacy-summary-label">We never sell your data</p>
          <p className="privacy-summary-note">Not to advertisers. Not to anyone.</p>
        </div>
        <div className="privacy-summary-card">
          <p className="privacy-summary-label">Delete any time</p>
          <p className="privacy-summary-note">Full account deletion from Settings.</p>
        </div>
        <div className="privacy-summary-card">
          <p className="privacy-summary-label">Encrypted in transit</p>
          <p className="privacy-summary-note">HTTPS on every connection.</p>
        </div>
        <div className="privacy-summary-card">
          <p className="privacy-summary-label">You control consent</p>
          <p className="privacy-summary-note">Change cookie preferences any time.</p>
        </div>
      </div>

      <div className="privacy-section-title">Full Policy</div>
      <div className="privacy-grid">
        {POLICY_SECTIONS.map(s => (
          <PolicyCard key={s.id} tag={s.tag} title={s.title} body={s.body} />
        ))}
      </div>

      <div className="privacy-trust">
        <h2>Manage Your Preferences</h2>
        <p>
          You can review and update your cookie consent at any time. Resetting
          your preferences will bring up the consent banner on your next page visit.
        </p>
        <div className="privacy-trust-actions">
          <button
            className="privacy-btn privacy-btn--primary"
            onClick={() => {
              localStorage.removeItem('nutrifeed_consent_v1');
              alert('Consent preferences reset. The cookie banner will appear on your next visit.');
            }}
          >
            Reset consent preferences
          </button>
          <button
            className="privacy-btn privacy-btn--secondary"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </button>
        </div>
      </div>

    </div>
  );
}

export default Privacy;