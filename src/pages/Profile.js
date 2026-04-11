import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import './Auth.css';
import './Profile.css';

const FARM_TYPES = [
  { value: 'broiler', label: 'Broiler' },
  { value: 'layer',   label: 'Layer' },
  { value: 'catfish', label: 'Catfish' },
  { value: 'rabbit',  label: 'Rabbit' },
  { value: 'pig',     label: 'Pig' },
  { value: 'mixed',   label: 'Mixed' },
];

const STATES = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
  'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT','Gombe','Imo',
  'Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa',
  'Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara',
];

function containsScript(value) {
  return /<script|javascript:|on\w+=/i.test(String(value));
}

function Profile() {
  const navigate              = useNavigate();
  const { user, login, logout } = useAuth();
  const { t }                 = useTranslation();

  const [formData, setFormData] = useState({
    name:      user?.name      || '',
    email:     user?.email     || '',
    farmType:  user?.farmType  || '',
    birdCount: user?.birdCount || '',
    phone:     user?.phone     || '',
    address:   user?.address   || '',
    state:     user?.state     || '',
  });
  const [errors, setErrors]   = useState({});
  const [saved, setSaved]     = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSaved(false);
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  }

  function validate() {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    else if (containsScript(formData.name)) newErrors.name = 'Invalid input detected';
    if (formData.birdCount && (isNaN(formData.birdCount) || Number(formData.birdCount) < 0)) {
      newErrors.birdCount = 'Enter a valid number of birds';
    }
    return newErrors;
  }

  function handleSave(e) {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setLoading(true);
    setTimeout(() => {
      login({ ...user, ...formData });
      setLoading(false);
      setSaved(true);
    }, 800);
  }

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="profile-page">

      <div className="profile-header">
        <div>
          <h1>{t('profile.title')}</h1>
          {user?.email && <p>{user.email}</p>}
        </div>
        <button className="profile-logout-btn" onClick={handleLogout}>
          {t('profile.logout')}
        </button>
      </div>

      <div className="profile-section-title">{t('profile.account_details')}</div>
      <div className="profile-card">
        <form onSubmit={handleSave} noValidate>

          <div className="form-group">
            <label htmlFor="profile-name">{t('auth.name_label')}</label>
            <input id="profile-name" type="text" name="name" value={formData.name} onChange={handleChange} aria-invalid={errors.name ? 'true' : 'false'} />
            {errors.name && <p className="field-error" role="alert">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="profile-email">{t('auth.email_label')}</label>
            <input id="profile-email" type="email" name="email" value={formData.email} disabled />
            <p className="field-hint">Email cannot be changed here.</p>
          </div>

          <div className="form-group">
            <label htmlFor="profile-phone">{t('profile.phone_label')}</label>
            <input id="profile-phone" type="tel" name="phone" placeholder="e.g. 08012345678" value={formData.phone} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="profile-address">{t('profile.address_label')}</label>
            <input id="profile-address" type="text" name="address" placeholder="e.g. 12 Farm Road, Oke Aro" value={formData.address} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="profile-state">{t('profile.state_label')}</label>
            <select id="profile-state" name="state" value={formData.state} onChange={handleChange}>
              <option value="">{t('profile.state_placeholder')}</option>
              {STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <p className="profile-section-label">{t('profile.farm_section')}</p>

          <div className="form-group">
            <label htmlFor="profile-farmType">{t('profile.farm_type_label')}</label>
            <select id="profile-farmType" name="farmType" value={formData.farmType} onChange={handleChange}>
              <option value="">{t('profile.farm_type_placeholder')}</option>
              {FARM_TYPES.map(ft => <option key={ft.value} value={ft.value}>{ft.label}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="profile-birdCount">{t('profile.birds_label')}</label>
            <input id="profile-birdCount" type="number" name="birdCount" value={formData.birdCount} onChange={handleChange} min="0" aria-invalid={errors.birdCount ? 'true' : 'false'} />
            {errors.birdCount && <p className="field-error" role="alert">{errors.birdCount}</p>}
          </div>

          <div className="profile-save-row">
            <button type="submit" className="auth-button profile-save-btn" disabled={loading}>
              {loading ? t('profile.saving') : t('profile.save_btn')}
            </button>
            {saved && <p className="profile-saved-msg">{t('profile.saved')}</p>}
          </div>

        </form>
      </div>

      <div className="profile-section-title">{t('profile.data_privacy')}</div>
      <div className="profile-card">

        <div className="profile-data-row">
          <div>
            <p className="profile-data-label">{t('profile.history_label')}</p>
            <p className="profile-data-desc">{t('profile.history_desc')}</p>
          </div>
          <button className="profile-action-btn">{t('profile.history_btn')}</button>
        </div>

        <div className="profile-data-divider" />

        <div className="profile-data-row">
          <div>
            <p className="profile-data-label">{t('profile.export_label')}</p>
            <p className="profile-data-desc">{t('profile.export_desc')}</p>
          </div>
          <button className="profile-action-btn">{t('profile.export_btn')}</button>
        </div>

        <div className="profile-data-divider" />

        <div className="profile-data-row">
          <div>
            <p className="profile-data-label profile-data-label--danger">{t('profile.delete_label')}</p>
            <p className="profile-data-desc">{t('profile.delete_desc')}</p>
          </div>
          <button className="profile-action-btn profile-action-btn--danger">{t('profile.delete_btn')}</button>
        </div>

      </div>

    </div>
  );
}

export default Profile;