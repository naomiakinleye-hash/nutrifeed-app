import { useNavigate } from 'react-router-dom';
import '../App.css';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>Smarter Feed. Healthier Farms.</h1>
          <p>
            BSF NutriFeed is an affordable, sustainable poultry feed made from
            Black Soldier Fly larvae — helping Nigerian farmers grow healthier
            livestock for less.
          </p>
          <button className="hero-button" onClick={() => navigate('/calculator')}>
            Calculate Your Feed
          </button>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600"
            alt="Poultry farm"
          />
        </div>
      </section>

      {/* WHAT IS BSF */}
      <section className="section">
        <p className="section-tag">The Feed Crisis Has a Solution</p>
        <h2>Stop Wasting Money on Overpriced Feed</h2>
        <p>
          Since 2022, conventional feed prices in Nigeria have risen over 60%.
          BSF NutriFeed was built as the direct answer — converting organic
          waste into high-protein livestock feed that costs less, performs
          better, and is produced locally.
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

      {/* HOW IT WORKS */}
      <section className="how-section">
        <h2>How It Works</h2>
        <div className="how-steps">

          <div className="how-step">
            <div className="step-number">01</div>
            <div className="step-image">
              <img
                src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400"
                alt="Input farm data"
              />
            </div>
            <h3>Input Your Farm Data</h3>
            <p>Enter the number of birds, growth stage, and feeding duration into our calculator.</p>
          </div>

          <div className="how-step">
            <div className="step-number">02</div>
            <div className="step-image">
              <img
                src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400"
                alt="Get feed recommendations"
              />
            </div>
            <h3>Get Feed Recommendations</h3>
            <p>Receive instant, research-backed feed quantity estimates tailored to your flock.</p>
          </div>

          <div className="how-step">
            <div className="step-number">03</div>
            <div className="step-image">
              <img
                src="https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=400"
                alt="Track growth on dashboard"
              />
            </div>
            <h3>Track Growth on Dashboard</h3>
            <p>Monitor feed production, growth rates, and alerts in real time on your farm dashboard.</p>
          </div>

        </div>
      </section>

      {/* FARMER QUOTE */}
      <section className="quote-section">
        <div className="quote-card">
          <p className="quote-text">
            "Since switching to BSF NutriFeed, my feed costs have dropped by almost
            40%. My birds are growing faster and I have more money left at the end
            of each month."
          </p>
          <p className="quote-author">Amina Bello, Poultry Farmer — Kaduna State</p>
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