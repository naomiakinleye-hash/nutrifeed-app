import { useState } from 'react';
import './FeedCalculator.css';

const DAILY_RATES = {
  Starter: 0.12,
  Grower: 0.10,
  Finisher: 0.08,
};

const RECOMMENDATIONS = {
  Starter: 'Young birds need consistent feeding every 4–6 hours. Prioritise protein intake at this stage for healthy early development.',
  Grower: 'Maintain a regular twice-daily feeding schedule. Monitor weight gain weekly and adjust quantity if growth slows.',
  Finisher: 'Slightly reduce feed per bird and watch weight closely. Consistent feeding in the final weeks has the biggest impact on market weight.',
};

function CalculatorForm({ formData, errors, onChange, onCalculate }) {
  return (
    <div className="calc-form">

      <div className="form-group">
        <label htmlFor="birds">Number of Birds</label>
        <input
          id="birds"
          type="number"
          name="birds"
          placeholder="e.g. 500"
          value={formData.birds}
          onChange={onChange}
        />
        {errors.birds && <p className="field-error">{errors.birds}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="stage">Growth Stage</label>
        <select
          id="stage"
          name="stage"
          value={formData.stage}
          onChange={onChange}
        >
          <option value="Starter">Starter (0–4 weeks)</option>
          <option value="Grower">Grower (4–8 weeks)</option>
          <option value="Finisher">Finisher (8+ weeks)</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="duration">Feeding Duration (days)</label>
        <input
          id="duration"
          type="number"
          name="duration"
          placeholder="e.g. 30"
          value={formData.duration}
          onChange={onChange}
        />
        {errors.duration && <p className="field-error">{errors.duration}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="costPerKg">Cost per kg (₦) — Optional</label>
        <input
          id="costPerKg"
          type="number"
          name="costPerKg"
          placeholder="e.g. 350"
          value={formData.costPerKg}
          onChange={onChange}
        />
        {errors.costPerKg && <p className="field-error">{errors.costPerKg}</p>}
      </div>

      <button className="calc-button" onClick={onCalculate}>
        Calculate Feed
      </button>

    </div>
  );
}

function ResultCard({ result }) {
  return (
    <div className="result-card">
      <p className="result-eyebrow">Your Results</p>

      <div className="result-item">
        <p className="result-label">Total Feed Required</p>
        <p className="result-value">{result.totalFeed} kg</p>
      </div>

      {result.totalCost && (
        <div className="result-item">
          <p className="result-label">Estimated Cost</p>
          <p className="result-value">₦{Number(result.totalCost).toLocaleString()}</p>
        </div>
      )}

      <div className="result-recommendation">
        <p className="result-label">Recommendation</p>
        <p className="result-advice">{result.recommendation}</p>
      </div>
    </div>
  );
}

function FeedCalculator() {
  const [formData, setFormData] = useState({
    birds: '',
    stage: 'Starter',
    duration: '',
    costPerKg: '',
  });

  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setResult(null);
  }

  function validate() {
    const newErrors = {};
    if (!formData.birds || isNaN(formData.birds) || Number(formData.birds) <= 0) {
      newErrors.birds = 'Enter a valid number of birds';
    }
    if (!formData.duration || isNaN(formData.duration) || Number(formData.duration) <= 0) {
      newErrors.duration = 'Duration must be greater than 0';
    }
    if (formData.costPerKg && (isNaN(formData.costPerKg) || Number(formData.costPerKg) < 0)) {
      newErrors.costPerKg = 'Enter a valid cost per kg';
    }
    return newErrors;
  }

  function calculate() {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const birds = Number(formData.birds);
    const duration = Number(formData.duration);
    const rate = DAILY_RATES[formData.stage];
    const totalFeed = birds * rate * duration;
    const totalCost = formData.costPerKg
      ? (totalFeed * Number(formData.costPerKg)).toFixed(2)
      : null;

    setResult({
      totalFeed: totalFeed.toFixed(2),
      totalCost,
      recommendation: RECOMMENDATIONS[formData.stage],
    });
  }

  return (
    <div className="calculator-page">

      <div className="calculator-header">
        <h1>Feed Calculator</h1>
        <p>
          Estimate how much BSF NutriFeed your flock needs based on your
          farm's specific conditions.
        </p>
      </div>

      <div className="calculator-layout">
        <CalculatorForm
          formData={formData}
          errors={errors}
          onChange={handleChange}
          onCalculate={calculate}
        />
        {result && <ResultCard result={result} />}
      </div>

      {/* HOW IT WORKS */}
      <div className="how-it-works">
        <h2>How This Calculation Works</h2>
        <p>
          Our calculator uses research-backed daily feed intake rates based on
          your birds' growth stage:
        </p>
        <div className="how-grid">
          <div className="how-card">
            <h3>Starter</h3>
            <p className="how-rate">0.12 kg / bird / day</p>
            <p className="how-age">Ages 0–4 weeks</p>
          </div>
          <div className="how-card">
            <h3>Grower</h3>
            <p className="how-rate">0.10 kg / bird / day</p>
            <p className="how-age">Ages 4–8 weeks</p>
          </div>
          <div className="how-card">
            <h3>Finisher</h3>
            <p className="how-rate">0.08 kg / bird / day</p>
            <p className="how-age">Ages 8+ weeks</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default FeedCalculator;