import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">

      <h2>📊 Farm Dashboard</h2>
      <p className="dashboard-subtitle">Live Feed Production Overview</p>

      {/* METRIC CARDS */}
      <div className="metrics">

        <div className="metric-card">
          <h3>🌾 Feed Produced</h3>
          <p className="metric-number">1,240 kg</p>
          <p className="metric-label">This Month</p>
        </div>

        <div className="metric-card">
          <h3>🐔 Poultry Fed</h3>
          <p className="metric-number">3,800</p>
          <p className="metric-label">Birds This Week</p>
        </div>

        <div className="metric-card">
          <h3>📈 Growth Rate</h3>
          <p className="metric-number">94%</p>
          <p className="metric-label">Above Target</p>
        </div>

        <div className="metric-card">
          <h3>💰 Cost Saved</h3>
          <p className="metric-number">₦82,000</p>
          <p className="metric-label">Vs Traditional Feed</p>
        </div>

      </div>

      {/* ALERTS SECTION */}
      <div className="alerts">
        <h3>🔔 Alerts & Notifications</h3>

        <div className="alert alert-green">
          ✅ Feed stock levels are healthy
        </div>

        <div className="alert alert-yellow">
          ⚠️ Larvae batch due for harvesting in 2 days
        </div>

        <div className="alert alert-red">
          🚨 Moisture levels in Storage Unit 3 are too high
        </div>

      </div>

    </div>
  );
}

export default Dashboard;