import './App.css';
import './App.css';
import Dashboard from './components/Dashboard';
import FarmForm from './components/FarmForm';

function App() {
  return (
    <div className="App">

      {/* HEADER */}
      <header className="header">
        <h1>🌱 BSF-Nutrifeed</h1>
        <p>Sustainable Poultry Feed for Healthier Farms</p>
      </header>

      {/* PRODUCT OVERVIEW */}
      <section className="section">
        <h2>What is BSF-Nutrifeed?</h2>
        <p>
          BSF-Nutrifeed is an affordable, sustainable, and highly nutritious
          poultry feed made from Black Soldier Fly larvae. It helps farmers
          grow healthier chickens while protecting our environment.
        </p>
      </section>

      {/* KEY BENEFITS */}
      <section className="section benefits">
        <h2>Why Choose BSF-Nutrifeed?</h2>
        <div className="cards">

          <div className="card">
            <h3>💰 Affordable</h3>
            <p>Costs less than traditional feed, saving farmers money every month.</p>
          </div>

          <div className="card">
            <h3>🌍 Sustainable</h3>
            <p>Made from organic waste, reducing environmental pollution.</p>
          </div>

          <div className="card">
            <h3>🐔 Nutritious</h3>
            <p>High in protein — helps poultry grow faster and stay healthier.</p>
          </div>

        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="cta">
        <h2>Ready to Transform Your Farm?</h2>
        <p>Join hundreds of farmers already using BSF-Nutrifeed.</p>
        <button className="cta-button">Get Started Today</button>
      </section>

{/* DASHBOARD */}
      <Dashboard />
{/* DASHBOARD */}
      <Dashboard />

      {/* FARM FORM */}
      <FarmForm />
      {/* FOOTER */}
      
      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 BSF-Nutrifeed | DSHub Internship Program</p>
      </footer>

    </div>
  );
}

export default App;