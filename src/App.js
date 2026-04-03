import './App.css';
import Dashboard from './components/Dashboard';
import FarmForm from './components/FarmForm';
import ProductList from './components/ProductList';

function App() {
  return (
    <div className="App">

      {/* NAVBAR */}
      <nav className="navbar">
        <span className="navbar-brand">BSF NutriFeed</span>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">
        <h1>Smarter Feed. Healthier Farms.</h1>
        <p>
          BSF NutriFeed is an affordable, sustainable poultry feed
          made from Black Soldier Fly larvae — helping Nigerian farmers
          grow healthier livestock for less.
        </p>
        <button className="hero-button">Track Your Feed</button>
      </section>

      {/* PRODUCT OVERVIEW */}
      <section className="section">
        <h2>What is BSF NutriFeed?</h2>
        <p>
          Developed in response to the growing feed crisis across Nigeria,
          BSF NutriFeed converts organic waste into high-protein livestock
          feed. It costs less than traditional feed, performs better, and
          is built for farmers who need results they can trust.
        </p>
      </section>

      {/* BENEFITS */}
      <div className="benefits">
        <h2>Why Choose BSF NutriFeed</h2>
        <div className="benefits-grid">

          <div className="benefit-card">
            <h3>Affordable</h3>
            <p>Significantly cheaper than conventional feed — reducing your monthly costs.</p>
          </div>

          <div className="benefit-card">
            <h3>Sustainable</h3>
            <p>Made from organic waste, reducing environmental impact on your community.</p>
          </div>

          <div className="benefit-card">
            <h3>Nutritious</h3>
            <p>High protein content that supports faster growth and healthier livestock.</p>
          </div>

        </div>
      </div>

      {/* CALL TO ACTION */}
      <section className="cta">
        <h2>Ready to Transform Your Farm?</h2>
        <p>Join farmers across Nigeria already using BSF NutriFeed.</p>
        <button className="cta-button">Get Started Today</button>
      </section>

      {/* DASHBOARD */}
      <Dashboard />

      {/* PRODUCT LIST */}
      <ProductList />

      {/* FARM FORM */}
      <FarmForm />

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 BSF NutriFeed | DSHub Internship Program</p>
      </footer>

    </div>
  );
}

export default App;