import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const MOCK_DATA = {
  metrics: [
    { id: 1, label: 'Feed Produced (kg)', value: '1,240', trend: '+8% this week' },
    { id: 2, label: 'Active Birds', value: '3,500', trend: 'Stable' },
    { id: 3, label: 'Feed Cost Saved (₦)', value: '₦184,000', trend: 'vs. conventional' },
    { id: 4, label: 'Avg. Growth Rate', value: '94%', trend: '+3% vs last month' },
  ],
  growth: [
    { label: 'Average Weight Gain', value: '2.4 kg', note: 'Per bird this month' },
    { label: 'Feed Efficiency Ratio', value: '1.8', note: 'Industry avg: 2.1' },
    { label: 'Mortality Rate', value: '1.2%', note: 'Below 2% target' },
    { label: 'Days to Market Weight', value: '38', note: 'Ahead of schedule' },
  ],
  alerts: [
    { id: 1, type: 'warning', message: 'Starter stock running low — consider restocking within 5 days.' },
    { id: 2, type: 'info', message: 'Batch 3 birds entering Grower stage this week.' },
    { id: 3, type: 'warning', message: 'Next feeding time: 8:00 AM tomorrow.' },
    { id: 4, type: 'info', message: 'Weekly growth report ready for review.' },
  ],
  chartData: [
    { week: 'Wk 1', feedUsed: 180, feedProduced: 220 },
    { week: 'Wk 2', feedUsed: 210, feedProduced: 240 },
    { week: 'Wk 3', feedUsed: 195, feedProduced: 260 },
    { week: 'Wk 4', feedUsed: 230, feedProduced: 290 },
    { week: 'Wk 5', feedUsed: 260, feedProduced: 310 },
    { week: 'Wk 6', feedUsed: 245, feedProduced: 330 },
  ],
};

function MetricCard({ label, value, trend }) {
  return (
    <div className="metric-card">
      <p className="metric-label">{label}</p>
      <p className="metric-value">{value}</p>
      <p className="metric-trend">{trend}</p>
    </div>
  );
}

function GrowthCard({ label, value, note }) {
  return (
    <div className="growth-card">
      <p className="metric-label">{label}</p>
      <p className="metric-value">{value}</p>
      <p className="metric-trend">{note}</p>
    </div>
  );
}

function ChartCard({ data }) {
  const maxVal = Math.max(...data.flatMap(d => [d.feedUsed, d.feedProduced]));
  return (
    <div className="chart-card">
      <h3>Feed Production vs. Usage</h3>
      <div className="chart-legend">
        <span className="legend-dot produced"></span><span>Produced</span>
        <span className="legend-dot used"></span><span>Used</span>
      </div>
      <div className="bar-chart">
        {data.map((d) => (
          <div className="bar-group" key={d.week}>
            <div className="bars">
              <div
                className="bar bar-produced"
                style={{ height: `${(d.feedProduced / maxVal) * 140}px` }}
                title={`Produced: ${d.feedProduced} kg`}
              ></div>
              <div
                className="bar bar-used"
                style={{ height: `${(d.feedUsed / maxVal) * 140}px` }}
                title={`Used: ${d.feedUsed} kg`}
              ></div>
            </div>
            <p className="bar-label">{d.week}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AlertBanner({ alerts }) {
  return (
    <div className="alerts-section">
      <h3>Alerts</h3>
      {alerts.map(alert => (
        <div key={alert.id} className={`alert-item alert-${alert.type}`}>
          <span className="alert-dot"></span>
          <p>{alert.message}</p>
        </div>
      ))}
    </div>
  );
}

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(MOCK_DATA);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <p>Loading farm data...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      <div className="dashboard-header">
        <div>
          <h1>Farm Dashboard</h1>
          <p>Live overview of your BSF NutriFeed operation.</p>
        </div>
        <button
          className="dashboard-cta"
          onClick={() => navigate('/calculator')}
        >
          Update Feed Plan
        </button>
      </div>

      <div className="dashboard-section-title">Feed Metrics</div>
      <div className="metrics-grid">
        {data.metrics.map(m => (
          <MetricCard key={m.id} label={m.label} value={m.value} trend={m.trend} />
        ))}
      </div>

      <div className="dashboard-section-title">Animal Growth Indicators</div>
      <div className="metrics-grid">
        {data.growth.map((g, i) => (
          <GrowthCard key={i} label={g.label} value={g.value} note={g.note} />
        ))}
      </div>

      <div className="dashboard-lower">
        <ChartCard data={data.chartData} />
        <AlertBanner alerts={data.alerts} />
      </div>

    </div>
  );
}

export default Dashboard;