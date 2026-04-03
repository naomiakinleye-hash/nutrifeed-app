import { useState } from 'react';
import './FeedCalculator.css';

function FeedCalculator() {
  const [formData, setFormData] = useState({
    birds: '',
    stage: 'Starter',
    duration: '',
    costPerKg: '',
  });

  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
    setResult(null);
  }

  function validate() {
    let newErrors = {};

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

    const dailyFeed = {
      Starter: 0.12,
      Grower: 0.10,
      Finisher: 0.08,
    };

    const birds = Number(formData.birds);
    const duration = Number(formData.duration);
    const rate = dailyFeed[formData.stage];
    const totalFeed = birds * rate * duration;
    const totalCost = formData.costPerKg
      ? totalFeed * Number(formData.costPerKg)
      : null;

    const recommendations = {
      Starter: 'Young birds need consistent feeding every 4-6 hours for optimal early growth.',
      Grower: 'Maintain a regular twice-daily feeding schedule to support steady development.',
      Finisher: 'Reduce feed slightly and monitor weight gain closely before harvest.',
    };

    setResult({
      totalFeed: totalFeed.toFixed(2),
      totalCost: totalCost ? totalCost.toFixed(2) : null,
      recommendation: recommendations[formData.stage],
    });
  }

  return (
    <div className="calculator-page">

      <div className="calculator-header">
        <h1>Feed Calculator</h1>
        <p>
          Estimate how much BSF NutriFeed your flock needs
          based on your farm's specific conditions.
        </p>
      </div>

      <div className="calculator-layout">

        {/* FORM SECTION */}
        <div className="calculator-form">

          <div className="form-group">
            <label>Number of Birds</label>
            <input
              type="number"
              name="birds"
              placeholder="e.g. 500"
              value={formData.birds}
              onChange={handleChange}
            />
            {errors.birds && <p className="error">{errors.birds}</p>}
          </div>

          <div className="form-group">
            <label>Growth Stage</label>
            <select
              name="stage"
              value={formData.stage}
              onChange={handleChange}
            >
              <option value="Starter">Starter (0-4 weeks)</option>
              <option value="Grower">Grower (4-8 weeks)</option>
              <option value="Finisher">Finisher (8+ weeks)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Feeding Duration (days)</label>
            <input
              type="number"
              name="duration"
              placeholder="e.g. 30"
              value={formData.duration}
              onChange={handleChange}
            />
            {errors.duration && <p className="error">{errors.duration}</p>}
          </div>

          <div className="form-group">
            <label>Cost per kg (₦) — Optional</label>
            <input
              type="number"
              name="costPerKg"
              placeholder="e.g. 350"
              value={formData.costPerKg}
              onChange={handleChange}
            />
            {errors.costPerKg && <p className="error">{errors.costPerKg}</p>}
          </div>

          <button className="calc-button" onClick={calculate}>
            Calculate Feed
          </button>

        </div>

        {/* RESULT SECTION */}
        {result && (
          <div className="result-card">

            <h3>Your Results</h3>

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
              <p>{result.recommendation}</p>
            </div>

          </div>
        )}

      </div>

      {/* HOW IT WORKS SECTION */}
      <div className="how-it-works">
        <h2>How This Calculation Works</h2>
        <p>
          Our calculator uses research-backed daily feed intake rates
          based on your birds growth stage:
        </p>
        <div className="how-grid">
          <div className="how-card">
            <h3>Starter</h3>
            <p>0.12 kg per bird per day</p>
            <p>Ages 0-4 weeks</p>
          </div>
          <div className="how-card">
            <h3>Grower</h3>
            <p>0.10 kg per bird per day</p>
            <p>Ages 4-8 weeks</p>
          </div>
          <div className="how-card">
            <h3>Finisher</h3>
            <p>0.08 kg per bird per day</p>
            <p>Ages 8+ weeks</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default FeedCalculator;