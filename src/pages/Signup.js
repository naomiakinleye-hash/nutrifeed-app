import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import TransparencyNotice from '../components/TransparencyNotice';
import './Auth.css';

function containsScript(value) {
  return /<script|javascript:|on\w+=/i.test(String(value));
}

const FARM_TYPES = [
  { value: '',        label: 'Select farm type (optional)' },
  { value: 'broiler', label: 'Broiler' },
  { value: 'layer',   label: 'Layer' },
  { value: 'catfish', label: 'Catfish' },
  { value: 'rabbit',  label: 'Rabbit' },
  { value: 'pig',     label: 'Pig' },
  { value: 'mixed',   label: 'Mixed' },
];

function Signup() {
  const navigate  = useNavigate();
  const { login } = useAuth();
  const { t }     = useTranslation();

  const [formData, setFormData] = useState({
    name:      '',
    email:     '',
    password:  '',
    farmType:  '',
    birdCount: '',
  });
  const [errors, setErrors]   = useState({});
  const [agreed, setAgreed]   = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  }

  function validate() {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (containsScript(formData.name)) {
      newErrors.name = 'Invalid input detected';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    } else if (containsScript(formData.email)) {
      newErrors.email = 'Invalid input detected';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.birdCount && (isNaN(formData.birdCount) || Number(formData.birdCount) < 0)) {
      newErrors.birdCount = 'Enter a valid number of birds';
    }

    if (!agreed) {
      newErrors.terms = 'You must agree to the Terms and Conditions to create an account';
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setLoading(true);
    // Firebase auth + Firestore write goes here in next phase
    setTimeout(() => {
      login({
        name:      formData.name,
        email:     formData.email,
        farmType:  formData.farmType,
        birdCount: formData.birdCount,
      });
      setLoading(false);
      navigate('/');
    }, 1000);
  }

  return (
    <div className="auth-page">
      <div className="auth-card auth-card--wide">

        <div className="auth-header">
          <p className="auth-brand">BSF NutriFeed</p>
          <h1>{t('auth.signup_title')}</h1>
          <p className="auth-subtitle">{t('auth.signup_subtitle')}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>

          <p className="auth-section-label">Account details</p>

          <div className="form-group">
            <label htmlFor="name">{t('auth.name_label')}</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="e.g. Amina Bello"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              aria-invalid={errors.name ? 'true' : 'false'}
            />
            {errors.name && <p className="field-error" role="alert">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="signup-email">{t('auth.email_label')}</label>
            <input
              id="signup-email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && <p className="field-error" role="alert">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="signup-password">{t('auth.password_label')}</label>
            <input
              id="signup-password"
              type="password"
              name="password"
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            {errors.password ? (
              <p className="field-error" role="alert">{errors.password}</p>
            ) : (
              <p className="field-hint">Minimum 8 characters</p>
            )}
          </div>

          <p className="auth-section-label auth-section-label--optional">
            Farm details <span className="auth-optional-tag">Optional</span>
          </p>
          <p className="auth-section-desc">
            Adding your farm details helps us personalise your recommendations.
            You can add these later from your profile.
          </p>

          <div className="form-group">
            <label htmlFor="farmType">Farm type</label>
            <select id="farmType" name="farmType" value={formData.farmType} onChange={handleChange}>
              {FARM_TYPES.map(ft => (
                <option key={ft.value} value={ft.value}>{ft.label}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="birdCount">Number of birds</label>
            <input
              id="birdCount"
              type="number"
              name="birdCount"
              placeholder="e.g. 500"
              value={formData.birdCount}
              onChange={handleChange}
              min="0"
              aria-invalid={errors.birdCount ? 'true' : 'false'}
            />
            {errors.birdCount && <p className="field-error" role="alert">{errors.birdCount}</p>}
          </div>

          <TransparencyNotice context="signup" />

          {/* Terms and conditions — required before account creation */}
          <div className="auth-terms-row">
            <label className="auth-terms-label">
              <input
                type="checkbox"
                checked={agreed}
                onChange={e => {
                  setAgreed(e.target.checked);
                  if (errors.terms) setErrors({ ...errors, terms: null });
                }}
                className="auth-terms-checkbox"
              />
              <span>
                I have read and agree to the{' '}
                <Link to="/terms" className="auth-switch-link" target="_blank" rel="noopener noreferrer">
                  Terms and Conditions
                </Link>
                {' '}and{' '}
                <Link to="/privacy" className="auth-switch-link" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors.terms && (
              <p className="field-error" role="alert">{errors.terms}</p>
            )}
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Creating account...' : t('auth.signup_button')}
          </button>

        </form>

        <p className="auth-switch">
          {t('auth.have_account')}{' '}
          <Link to="/login" className="auth-switch-link">{t('auth.log_in')}</Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;