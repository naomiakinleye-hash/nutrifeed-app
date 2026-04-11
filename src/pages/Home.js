import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageTransition from '../components/PageTransition';
import '../App.css';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const { t }    = useTranslation();

  return (
    <PageTransition>
      <div>

        <section className="hero">
          <div className="hero-content">
            <h1>{t('home.hero_title')}</h1>
            <p>{t('home.hero_subtitle')}</p>
            <button className="hero-button" onClick={() => navigate('/calculator')}>
              {t('home.hero_button')}
            </button>
          </div>
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800"
              alt="Poultry farm"
            />
          </div>
        </section>

        <section className="section">
          <p className="section-tag">{t('home.section_tag')}</p>
          <h2>{t('home.section_title')}</h2>
          <p>{t('home.section_body')}</p>
        </section>

        <section className="edu-section">
          <h2>{t('home.why_switch')}</h2>
          <div className="edu-grid">
            <div className="edu-card">
              <h3>{t('home.edu_what_title')}</h3>
              <p>{t('home.edu_what_body')}</p>
            </div>
            <div className="edu-card">
              <h3>{t('home.edu_safe_title')}</h3>
              <p>{t('home.edu_safe_body')}</p>
            </div>
            <div className="edu-card">
              <h3>{t('home.edu_trust_title')}</h3>
              <p>{t('home.edu_trust_body')}</p>
            </div>
          </div>
        </section>

        <section className="how-section">
          <h2>{t('home.how_title')}</h2>
          <div className="how-steps">
            <div className="how-step">
              <div className="step-number">01</div>
              <div className="step-image">
                <img src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600" alt="Input farm data" />
              </div>
              <h3>{t('home.step1_title')}</h3>
              <p>{t('home.step1_body')}</p>
            </div>
            <div className="how-step">
              <div className="step-number">02</div>
              <div className="step-image">
                <img src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600" alt="Get feed recommendations" />
              </div>
              <h3>{t('home.step2_title')}</h3>
              <p>{t('home.step2_body')}</p>
            </div>
            <div className="how-step">
              <div className="step-number">03</div>
              <div className="step-image">
                <img src="https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=600" alt="Track growth" />
              </div>
              <h3>{t('home.step3_title')}</h3>
              <p>{t('home.step3_body')}</p>
            </div>
          </div>
        </section>

        <section className="quote-section">
          <div className="quote-card">
            <p className="quote-text">{t('home.quote_text')}</p>
            <p className="quote-author">{t('home.quote_author')}</p>
          </div>
        </section>

        <section className="benefits">
          <h2>{t('home.benefits_title')}</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <img src="https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=600" alt="Affordable" className="benefit-img" />
              <h3>{t('home.benefit1_title')}</h3>
              <p>{t('home.benefit1_body')}</p>
            </div>
            <div className="benefit-card">
              <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600" alt="Sustainable" className="benefit-img" />
              <h3>{t('home.benefit2_title')}</h3>
              <p>{t('home.benefit2_body')}</p>
            </div>
            <div className="benefit-card">
              <img src="https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=600" alt="Nutritious" className="benefit-img" />
              <h3>{t('home.benefit3_title')}</h3>
              <p>{t('home.benefit3_body')}</p>
            </div>
          </div>
        </section>

        <section className="cta">
          <h2>{t('home.cta_title')}</h2>
          <p>{t('home.cta_subtitle')}</p>
          <button className="cta-button" onClick={() => navigate('/calculator')}>
            {t('home.cta_button')}
          </button>
        </section>

      </div>
    </PageTransition>
  );
}

export default Home;