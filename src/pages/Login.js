import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

function containsScript(value) {
  return /<script|javascript:|on\w+=/i.test(String(value));
}

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  }

  function validate() {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    } else if (containsScript(formData.email)) {
      newErrors.email = 'Invalid input detected';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
    // Firebase auth will go here in the next phase
    // For now, simulate a login delay
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-header">
          <p className="auth-brand">BSF NutriFeed</p>
          <h1>Welcome back</h1>
          <p className="auth-subtitle">Log in to view your farm dashboard and feed history.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="field-error" role="alert">{errors.email}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby={errors.password ? 'password-error' : undefined}
            />
            {errors.password && (
              <p id="password-error" className="field-error" role="alert">{errors.password}</p>
            )}
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Log in'}
          </button>

        </form>

        <p className="auth-switch">
          Don't have an account?{' '}
          <Link to="/signup" className="auth-switch-link">Create one</Link>
        </p>

        <p className="auth-notice">
          Your password is stored as a secure hash. We cannot read it.{' '}
          <Link to="/privacy" className="auth-switch-link">Privacy Policy</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;