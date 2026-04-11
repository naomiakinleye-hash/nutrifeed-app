import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TransparencyNotice from '../components/TransparencyNotice';
import './FeedCalculator.css';

const DAILY_RATES = { Starter: 0.12, Grower: 0.10, Finisher: 0.08 };

function containsScript(value) {
  return /<script|javascript:|on\w+=/i.test(String(value));
}

function FeedCalculator() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({ birds: '', stage: 'Starter', duration: '', costPerKg: '' });
  const [errors, setErrors]     = useState({});
  const [result, setResult]     = useState(null);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setResult(null);
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  }

  function validate() {
    const newErrors = {};
    if (!formData.birds || isNaN(formData.birds) || Number(formData.birds) <= 0) {
      newErrors.birds = 'Enter a valid number of birds';
    } else if (!Number.isInteger(Number(formData.birds))) {
      newErrors.birds = 'Number of birds must be a whole number';
    } else if (Number(formData.birds) > 1000000) {
      newErrors.birds = 'Number of birds cannot exceed 1,000,000';
    } else if (containsScript(formData.birds)) {
      newErrors.birds = 'Invalid input detected';
    }
    if (!formData.duration || isNaN(formData.duration) || Number(formData.duration) <= 0) {
      newErrors.duration = 'Duration must be greater than 0';
    } else if (!Number.isInteger(Number(formData.duration))) {
      newErrors.duration = 'Duration must be a whole number of days';
    } else if (Number(formData.duration) > 365) {
      newErrors.duration = 'Duration cannot exceed 365 days';
    }
    if (formData.costPerKg && (isNaN(formData.costPerKg) || Number(formData.costPerKg) < 0)) {
      newErrors.costPerKg = 'Enter a valid cost per kg';
    }
    return newErrors;
  }

  function calculate() {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setErrors({});

    const birds     = Number(formData.birds);
    const duration  = Number(formData.duration);
    const rate      = DAILY_RATES[formData.stage];
    const totalFeed = birds * rate * duration;
    const totalCost = formData.costPerKg ? (totalFeed * Number(formData.costPerKg)).toFixed(2) : null;

    const recommendations = {
      Starter:  'Young birds need consistent feeding every 4-6 hours. Prioritise protein intake at this stage for healthy early development.',
      Grower:   'Maintain a regular twice-daily feeding schedule. Monitor weight gain weekly and adjust quantity if growth slows.',
      Finisher: 'Slightly reduce feed per bird and watch weight closely. Consistent feeding in the final weeks has the biggest impact on market weight.',
    };

    setResult({ totalFeed: totalFeed.toFixed(2), totalCost, recommendation: recommendations[formData.stage] });
  }

  return (
    <div className="calculator-page">

      <div className="calculator-header">
        <h1>{t('calculator.title')}</h1>
        <p>{t('calculator.subtitle')}</p>
      </div>

      <div className="calculator-layout">

        {/* Form */}
        <div className="calc-form">

          <div className="form-group">
            <label htmlFor="birds">{t('calculator.birds_label')}</label>
            <input id="birds" type="number" name="birds" placeholder={t('calculator.birds_placeholder')} value={formData.birds} onChange={handleChange} min="1" max="1000000" aria-invalid={errors.birds ? 'true' : 'false'} />
            {errors.birds && <p className="field-error" role="alert">{errors.birds}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="stage">{t('calculator.stage_label')}</label>
            <select id="stage" name="stage" value={formData.stage} onChange={handleChange}>
              <option value="Starter">{t('calculator.stage_starter')}</option>
              <option value="Grower">{t('calculator.stage_grower')}</option>
              <option value="Finisher">{t('calculator.stage_finisher')}</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="duration">{t('calculator.duration_label')}</label>
            <input id="duration" type="number" name="duration" placeholder={t('calculator.duration_placeholder')} value={formData.duration} onChange={handleChange} min="1" max="365" aria-invalid={errors.duration ? 'true' : 'false'} />
            {errors.duration && <p className="field-error" role="alert">{errors.duration}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="costPerKg">{t('calculator.cost_label')}</label>
            <input id="costPerKg" type="number" name="costPerKg" placeholder={t('calculator.cost_placeholder')} value={formData.costPerKg} onChange={handleChange} min="0" aria-invalid={errors.costPerKg ? 'true' : 'false'} />
            {errors.costPerKg && <p className="field-error" role="alert">{errors.costPerKg}</p>}
          </div>

          <TransparencyNotice context="calculator" />

          <button className="calc-button" onClick={calculate}>
            {t('calculator.button')}
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="result-card">
            <p className="result-eyebrow">{t('calculator.result_title')}</p>

            <div className="result-item">
              <p className="result-label">{t('calculator.result_feed')}</p>
              <p className="result-value">{result.totalFeed} kg</p>
            </div>

            {result.totalCost && (
              <div className="result-item">
                <p className="result-label">{t('calculator.result_cost')}</p>
                <p className="result-value">N{Number(result.totalCost).toLocaleString()}</p>
              </div>
            )}

            <div className="result-recommendation">
              <p className="result-label">{t('calculator.result_recommendation')}</p>
              <p className="result-advice">{result.recommendation}</p>
            </div>

            <p className="result-notice">Your calculation stays on your device unless you are logged in.</p>
          </div>
        )}

      </div>

      {/* How it works */}
      <div className="how-it-works">
        <h2>{t('calculator.how_title')}</h2>
        <p>{t('calculator.how_subtitle')}</p>
        <div className="how-grid">
          <div className="how-card">
            <h3>{t('calculator.stage_starter')}</h3>
            <p className="how-rate">0.12 kg / bird / day</p>
          </div>
          <div className="how-card">
            <h3>{t('calculator.stage_grower')}</h3>
            <p className="how-rate">0.10 kg / bird / day</p>
          </div>
          <div className="how-card">
            <h3>{t('calculator.stage_finisher')}</h3>
            <p className="how-rate">0.08 kg / bird / day</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default FeedCalculator;