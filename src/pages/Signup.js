import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import TransparencyNotice from '../components/TransparencyNotice';
import './Auth.css';

function containsScript(value) {
  return /<script|javascript:|on\w+=/i.test(String(value));
}

const FARM_TYPES = [
  { value: '', label: 'Select farm type (optional)' },
  { value: 'broiler', label: 'Broiler' },
  { value: 'layer', label: 'Layer' },
  { value: 'catfish', label: 'Catfish' },
  { value: 'rabbit', label: 'Rabbit' },
  { value: 'pig', label: 'Pig' },
  { value: 'mixed', label: 'Mixed' },
];

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name:      '',
    email:     '',
    password:  '',
    farmType:  '',
    birdCount: '',
  });

  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
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

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    // Firebase auth + Firestore write will go here in the next phase
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  }

  return (
    <div className="auth-page">
      <div className="auth-card auth-card--wide">

        <div className="auth-header">
          <p className="auth-brand">BSF NutriFeed</p>
          <h1>Create your account</h1>
          <p className="auth-subtitle">
            Track your feed calculations, monitor growth, and get personalised
            recommendations.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>

          {/* Required fields */}
          <p className="auth-section-label">Account details</p>

          <div className="form-group">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="e.g. Amina Bello"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="field-error" role="alert">{errors.name}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="signup-email">Email address</label>
            <input
              id="signup-email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'signup-email-error' : undefined}
            />
            {errors.email && (
              <p id="signup-email-error" className="field-error" role="alert">{errors.email}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              type="password"
              name="password"
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby={errors.password ? 'signup-password-error' : 'password-hint'}
            />
            {errors.password ? (
              <p id="signup-password-error" className="field-error" role="alert">{errors.password}</p>
            ) : (
              <p id="password-hint" className="field-hint">Minimum 8 characters</p>
            )}
          </div>

          {/* Optional farm details */}
          <p className="auth-section-label auth-section-label--optional">
            Farm details <span className="auth-optional-tag">Optional</span>
          </p>
          <p className="auth-section-desc">
            Adding your farm details helps us personalise feed recommendations.
            You can skip this and add it later from your profile.
          </p>

          <div className="form-group">
            <label htmlFor="farmType">Farm type</label>
            <select
              id="farmType"
              name="farmType"
              value={formData.farmType}
              onChange={handleChange}
            >
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
              aria-describedby={errors.birdCount ? 'birdCount-error' : undefined}
            />
            {errors.birdCount && (
              <p id="birdCount-error" className="field-error" role="alert">{errors.birdCount}</p>
            )}
          </div>

          <TransparencyNotice context="signup" />

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>

        </form>

        <p className="auth-switch">
          Already have an account?{' '}
          <Link to="/login" className="auth-switch-link">Log in</Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;