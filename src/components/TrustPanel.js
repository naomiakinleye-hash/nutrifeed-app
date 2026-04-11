import { useTranslation } from 'react-i18next';
import './TrustPanel.css';

function TrustPanel() {
  const { t } = useTranslation();

  return (
    <div className="trust-panel">
      <p className="trust-panel-heading">{t('trust.title')}</p>

      <div className="trust-grid">

        <div className="trust-card">
          <div className="trust-status-row">
            <span className="trust-indicator trust-indicator--green" />
            <p className="trust-card-label">{t('trust.system_status')}</p>
          </div>
          <p className="trust-card-value">{t('trust.system_online')}</p>
          <p className="trust-card-note">{t('trust.system_note')}</p>
        </div>

        <div className="trust-card">
          <div className="trust-status-row">
            <span className="trust-indicator trust-indicator--green" />
            <p className="trust-card-label">{t('trust.data_usage')}</p>
          </div>
          <p className="trust-card-value">{t('trust.data_local')}</p>
          <p className="trust-card-note">{t('trust.data_note')}</p>
        </div>

        <div className="trust-card">
          <div className="trust-status-row">
            <span className="trust-indicator trust-indicator--green" />
            <p className="trust-card-label">{t('trust.security')}</p>
          </div>
          <p className="trust-card-value">{t('trust.security_https')}</p>
          <p className="trust-card-note">{t('trust.security_note')}</p>
        </div>

        <div className="trust-card">
          <div className="trust-status-row">
            <span className="trust-indicator trust-indicator--amber" />
            <p className="trust-card-label">{t('trust.compliance')}</p>
          </div>
          <p className="trust-card-value">{t('trust.compliance_ndpa')}</p>
          <p className="trust-card-note">{t('trust.compliance_note')}</p>
        </div>

      </div>

      <p className="trust-panel-footer">
        {t('trust.footer')}{' '}
        <a href="/privacy" className="trust-panel-link">{t('trust.footer_link')}</a>
      </p>
    </div>
  );
}

export default TrustPanel;