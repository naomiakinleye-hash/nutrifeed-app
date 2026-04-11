import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

function Dashboard() {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate              = useNavigate();
  const { t }                 = useTranslation();
  const { user }              = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setData({
        metrics: [
          { id: 1, label: t('dashboard.metric_feed_produced'), value: '1,240',    trend: t('dashboard.trend_week') },
          { id: 2, label: t('dashboard.metric_active_birds'),  value: user?.birdCount ? Number(user.birdCount).toLocaleString() : '—', trend: t('dashboard.trend_stable') },
          { id: 3, label: t('dashboard.metric_cost_saved'),    value: '₦184,000', trend: t('dashboard.trend_vs_conventional') },
          { id: 4, label: t('dashboard.metric_growth_rate'),   value: '94%',      trend: t('dashboard.trend_vs_last_month') },
        ],
        growth: [
          { label: t('dashboard.growth_weight_gain'),  value: '2.4 kg', note: t('dashboard.growth_weight_note') },
          { label: t('dashboard.growth_efficiency'),   value: '1.8',    note: t('dashboard.growth_efficiency_note') },
          { label: t('dashboard.growth_mortality'),    value: '1.2%',   note: t('dashboard.growth_mortality_note') },
          { label: t('dashboard.growth_days_market'),  value: '38',     note: t('dashboard.growth_days_note') },
        ],
        alerts: [
          { id: 1, type: 'warning', message: t('dashboard.alert_stock_low') },
          { id: 2, type: 'info',    message: t('dashboard.alert_grower_stage') },
          { id: 3, type: 'warning', message: t('dashboard.alert_feeding_time') },
          { id: 4, type: 'info',    message: t('dashboard.alert_report_ready') },
        ],
        chartData: [
          { week: t('dashboard.week', { n: 1 }), feedUsed: 180, feedProduced: 220 },
          { week: t('dashboard.week', { n: 2 }), feedUsed: 210, feedProduced: 240 },
          { week: t('dashboard.week', { n: 3 }), feedUsed: 195, feedProduced: 260 },
          { week: t('dashboard.week', { n: 4 }), feedUsed: 230, feedProduced: 290 },
          { week: t('dashboard.week', { n: 5 }), feedUsed: 260, feedProduced: 310 },
          { week: t('dashboard.week', { n: 6 }), feedUsed: 245, feedProduced: 330 },
        ],
      });
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [t, user]);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <p>{t('dashboard.loading')}</p>
      </div>
    );
  }

  const farmTypeLabel = user?.farmType
    ? user.farmType.charAt(0).toUpperCase() + user.farmType.slice(1)
    : null;

  return (
    <div className="dashboard-page">

      <div className="dashboard-header">
        <div>
          <h1>{t('dashboard.title')}</h1>
          {/* Show the farmer's name and farm type from their account */}
          <p>
            {user?.name ? `${user.name} · ` : ''}
            {farmTypeLabel ? `${farmTypeLabel} farm · ` : ''}
            {t('dashboard.subtitle')}
          </p>
        </div>
        <button className="dashboard-cta" onClick={() => navigate('/calculator')}>
          {t('dashboard.cta')}
        </button>
      </div>

      <div className="dashboard-section-title">{t('dashboard.feed_metrics')}</div>
      <div className="metrics-grid">
        {data.metrics.map(m => (
          <div className="metric-card" key={m.id}>
            <p className="metric-label">{m.label}</p>
            <p className="metric-value">{m.value}</p>
            <p className="metric-trend">{m.trend}</p>
          </div>
        ))}
      </div>

      <div className="dashboard-section-title">{t('dashboard.growth_indicators')}</div>
      <div className="metrics-grid">
        {data.growth.map((g, i) => (
          <div className="growth-card" key={i}>
            <p className="metric-label">{g.label}</p>
            <p className="metric-value">{g.value}</p>
            <p className="metric-trend">{g.note}</p>
          </div>
        ))}
      </div>

      <div className="dashboard-lower">

        <div className="chart-card">
          <h3>{t('dashboard.chart_title')}</h3>
          <div className="chart-legend">
            <span className="legend-dot produced" />
            <span>{t('dashboard.chart_produced')}</span>
            <span className="legend-dot used" />
            <span>{t('dashboard.chart_used')}</span>
          </div>
          <div className="bar-chart">
            {data.chartData.map((d) => {
              const maxVal = Math.max(...data.chartData.flatMap(x => [x.feedUsed, x.feedProduced]));
              return (
                <div className="bar-group" key={d.week}>
                  <div className="bars">
                    <div
                      className="bar bar-produced"
                      style={{ height: `${(d.feedProduced / maxVal) * 140}px` }}
                      title={`${t('dashboard.chart_produced')}: ${d.feedProduced} kg`}
                    />
                    <div
                      className="bar bar-used"
                      style={{ height: `${(d.feedUsed / maxVal) * 140}px` }}
                      title={`${t('dashboard.chart_used')}: ${d.feedUsed} kg`}
                    />
                  </div>
                  <p className="bar-label">{d.week}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="alerts-section">
          <h3>{t('dashboard.alerts_title')}</h3>
          {data.alerts.map(alert => (
            <div key={alert.id} className={`alert-item alert-${alert.type}`}>
              <span className="alert-dot" />
              <p>{alert.message}</p>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

export default Dashboard;