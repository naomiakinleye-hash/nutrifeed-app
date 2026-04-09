import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import './Profile.css';

// Mock user data — will be replaced by Firebase Firestore fetch in next phase
const MOCK_USER = {
  name:      'Amina Bello',
  email:     'amina@example.com',
  farmType:  'broiler',
  birdCount: '500',
  joinedDate: 'March 2026',
};

const FARM_TYPES = [
  { value: 'broiler',  label: 'Broiler' },
  { value: 'layer',    label: 'Layer' },
  { value: 'catfish',  label: 'Catfish' },
  { value: 'rabbit',   label: 'Rabbit' },
  { value: 'pig',      label: 'Pig' },
  { value: 'mixed',    label: 'Mixed' },
];

function containsScript(value) {
  return /<script|javascript:|on\w+=/i.test(String(value));
}

function Profile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ ...MOCK_USER });
  const [errors, setErrors]     = useState({});
  const [saved, setSaved]       = useState(false);
  const [loading, setLoading]   = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSaved(false);
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  }

  function validate() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (containsScript(formData.name)) {
      newErrors.name = 'Invalid input detected';
    }

    if (formData.birdCount && (isNaN(formData.birdCount) || Number(formData.birdCount) < 0)) {
      newErrors.birdCount = 'Enter a valid number of birds';
    }

    return newErrors;
  }

  function handleSave(e) {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    // Firestore update will go here in the next phase
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
    }, 800);
  }

  function handleLogout() {
    // Firebase signOut will go here in the next phase
    navigate('/login');
  }

  return (
    <div className="profile-page">

      <div className="profile-header">
        <div>
          <h1>Your Profile</h1>
          <p>Member since {formData.joinedDate}</p>
        </div>
        <button className="profile-logout-btn" onClick={handleLogout}>
          Log out
        </button>
      </div>

      {/* Account section */}
      <div className="profile-section-title">Account Details</div>
      <div className="profile-card">
        <form onSubmit={handleSave} noValidate>

          <div className="form-group">
            <label htmlFor="profile-name">Full name</label>
            <input
              id="profile-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'profile-name-error' : undefined}
            />
            {errors.name && (
              <p id="profile-name-error" className="field-error" role="alert">{errors.name}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="profile-email">Email address</label>
            <input
              id="profile-email"
              type="email"
              name="email"
              value={formData.email}
              disabled
              aria-describedby="email-hint"
            />
            <p id="email-hint" className="field-hint">
              Email cannot be changed. Contact us to update it.
            </p>
          </div>

          <p className="profile-section-label">Farm Details</p>

          <div className="form-group">
            <label htmlFor="profile-farmType">Farm type</label>
            <select
              id="profile-farmType"
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
            <label htmlFor="profile-birdCount">Number of birds</label>
            <input
              id="profile-birdCount"
              type="number"
              name="birdCount"
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

          <div className="profile-save-row">
            <button type="submit" className="auth-button profile-save-btn" disabled={loading}>
              {loading ? 'Saving...' : 'Save changes'}
            </button>
            {saved && <p className="profile-saved-msg">Changes saved.</p>}
          </div>

        </form>
      </div>

      {/* Data & privacy section */}
      <div className="profile-section-title">Data & Privacy</div>
      <div className="profile-card">
        <div className="profile-data-row">
          <div>
            <p className="profile-data-label">Your calculation history</p>
            <p className="profile-data-desc">
              All feed calculations you have run while logged in are stored against
              your account and used to personalise recommendations.
            </p>
          </div>
          <button className="profile-action-btn">View history</button>
        </div>

        <div className="profile-data-divider" />

        <div className="profile-data-row">
          <div>
            <p className="profile-data-label">Export your data</p>
            <p className="profile-data-desc">
              Download a copy of all data we hold about you.
            </p>
          </div>
          <button className="profile-action-btn">Request export</button>
        </div>

        <div className="profile-data-divider" />

        <div className="profile-data-row">
          <div>
            <p className="profile-data-label profile-data-label--danger">Delete account</p>
            <p className="profile-data-desc">
              Permanently deletes your account and all associated data after a
              30-day safety window.
            </p>
          </div>
          <button className="profile-action-btn profile-action-btn--danger">Delete account</button>
        </div>
      </div>

    </div>
  );
}

export default Profile;