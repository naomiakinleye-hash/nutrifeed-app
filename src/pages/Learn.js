import './Learn.css';

const ARTICLES = [
  {
    id: 1,
    tag: 'Nutrition',
    title: 'Why Black Soldier Fly Larvae Are a Superior Protein Source',
    body: `Black Soldier Fly (BSF) larvae contain 40–45% crude protein on a dry matter basis — 
    comparable to fishmeal, which is the industry standard for high-performance poultry feed. 
    Unlike soy-based alternatives, BSF larvae also contain lauric acid, a fatty acid shown to 
    have natural antimicrobial properties. This means healthier birds with fewer inputs.`,
  },
  {
    id: 2,
    tag: 'Safety',
    title: 'Is Insect-Based Feed Safe for Nigerian Poultry?',
    body: `Yes. BSF feed has been approved and tested in multiple African markets. Studies from 
    the International Platform of Insects for Food and Feed (IPIFF) confirm no adverse health 
    outcomes in broilers or layers fed BSF-based diets. Growth rates and FCR (feed conversion ratio) 
    either match or exceed those of conventional feed under Nigerian farm conditions.`,
  },
  {
    id: 3,
    tag: 'Economics',
    title: 'The Feed Cost Crisis — and Why BSF Is the Answer',
    body: `Since 2022, the cost of conventional poultry feed in Nigeria has risen over 60%, 
    driven by naira depreciation and import dependency on soy and fishmeal. BSF larvae can be 
    produced locally using organic waste — cassava peels, vegetable offcuts, brewery waste — 
    with minimal infrastructure. BSF NutriFeed passes that saving directly to farmers.`,
  },
  {
    id: 4,
    tag: 'Sustainability',
    title: 'How BSF Feed Reduces Waste and Environmental Pressure',
    body: `Each tonne of BSF larvae produced converts approximately 2–4 tonnes of organic waste 
    into feed. This circular model reduces landfill burden, lowers methane emissions from 
    decomposing waste, and produces a nitrogen-rich frass (insect excrement) that works as a 
    natural fertiliser. BSF NutriFeed is not just good for your farm — it is good for your community.`,
  },
];

function LearnCard({ tag, title, body }) {
  return (
    <article className="learn-card">
      <span className="learn-tag">{tag}</span>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

function Learn() {
  return (
    <div className="learn-page">

      <div className="learn-header">
        <h1>Understanding BSF Feed</h1>
        <p>
          Everything a Nigerian farmer needs to know about Black Soldier Fly feed —
          the science, the safety, the economics.
        </p>
      </div>

      <div className="learn-grid">
        {ARTICLES.map(a => (
          <LearnCard key={a.id} tag={a.tag} title={a.title} body={a.body} />
        ))}
      </div>

      {/* TRUST SECTION */}
      <div className="trust-section">
        <h2>Built on Evidence, Not Just Promise</h2>
        <p>
          BSF NutriFeed is grounded in agricultural research from institutions across
          Africa, Asia, and Europe. Farmers using BSF-based diets report consistent
          results — better weight gain, lower mortality, and reduced feed costs —
          without needing to change their existing farm infrastructure.
        </p>
        <p>
          If you are transitioning from a conventional feed brand, expect a 2-week
          adjustment period. Most farmers report full adaptation and visible results
          within 30 days.
        </p>
      </div>

    </div>
  );
}

export default Learn;