import { useNavigate } from 'react-router-dom';
import '../App.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div>

      {/* HERO */}
      <section className="hero">
        <h1>Smarter Feed. Healthier Farms.</h1>
        <p>
          BSF NutriFeed is an affordable, sustainable poultry feed made from
          Black Soldier Fly larvae — helping Nigerian farmers grow healthier
          livestock for less.
        </p>
        <button className="hero-button" onClick={() => navigate('/calculator')}>
          Calculate Your Feed
        </button>
      </section>

      {/* WHAT IS BSF */}
      <section className="section">
        <h2>What is BSF NutriFeed?</h2>
        <p>
          Developed in response to the growing feed crisis across Nigeria,
          BSF NutriFeed converts organic waste into high-protein livestock feed.
          It costs less than traditional feed, performs better, and is built for
          farmers who need results they can trust.
        </p>
      </section>

      {/* EDUCATIONAL */}
      <section className="edu-section">
        <h2>Why Farmers Are Making the Switch</h2>
        <div className="edu-grid">
          <div className="edu-card">
            <h3>What is Black Soldier Fly Feed?</h3>
            <p>
              Black Soldier Fly larvae are rich in protein and healthy fats. When
              processed into feed, they provide everything poultry needs to grow —
              at a fraction of the cost of conventional feed.
            </p>
          </div>
          <div className="edu-card">
            <h3>Is it Safe?</h3>
            <p>
              Yes. BSF feed has been tested and used across Africa and Asia. Farmers
              report equal or better growth rates compared to traditional feed brands
              like Skretting and Chikun.
            </p>
          </div>
          <div className="edu-card">
            <h3>Can I Trust it?</h3>
            <p>
              Farmers from Lagos to Kaduna are already using BSF NutriFeed. Price
              complaints about conventional feed have intensified since 2024 — BSF
              NutriFeed was built as the direct answer.
            </p>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="benefits">
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
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready to Transform Your Farm?</h2>
        <p>Join farmers across Nigeria already using BSF NutriFeed.</p>
        <button className="cta-button" onClick={() => navigate('/calculator')}>
          Get Started Today
        </button>
      </section>

    </div>
  );
}

export default Home;