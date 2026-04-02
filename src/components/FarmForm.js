import { useState } from 'react';
import './FarmForm.css';

function FarmForm() {

  // This stores whatever the farmer types into the form
  const [formData, setFormData] = useState({
    farmName: '',
    location: '',
    numberOfBirds: '',
    feedAmount: '',
    farmerName: '',
  });

  // This stores any error messages
  const [errors, setErrors] = useState({});

  // This tracks if the form was submitted successfully
  const [submitted, setSubmitted] = useState(false);

  // This runs every time the farmer types in any field
  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  // This checks if everything is filled in correctly
  function validate() {
    let newErrors = {};

    if (!formData.farmName) {
      newErrors.farmName = 'Please enter your farm name';
    }
    if (!formData.location) {
      newErrors.location = 'Please enter your location';
    }
    if (!formData.numberOfBirds) {
      newErrors.numberOfBirds = 'Please enter number of birds';
    } else if (isNaN(formData.numberOfBirds)) {
      newErrors.numberOfBirds = 'Please enter a valid number';
    }
    if (!formData.feedAmount) {
      newErrors.feedAmount = 'Please enter feed amount';
    } else if (isNaN(formData.feedAmount)) {
      newErrors.feedAmount = 'Please enter a valid number';
    }
    if (!formData.farmerName) {
      newErrors.farmerName = 'Please enter your name';
    }

    return newErrors;
  }

  // This runs when the farmer clicks Submit
  function handleSubmit(event) {
    event.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setSubmitted(true);
    }
  }

  // If submitted successfully, show a success message
  if (submitted) {
    return (
      <div className="form-container">
        <div className="success-message">
          <h2>✅ Data Submitted Successfully!</h2>
          <p>Thank you, {formData.farmerName}!</p>
          <p>Your farm data for <strong>{formData.farmName}</strong> has been recorded.</p>
          <button 
            className="submit-button" 
            onClick={() => setSubmitted(false)}
          >
            Submit Another Entry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2>🌾 Farm Data Entry</h2>
      <p className="form-subtitle">Fill in your farm details below</p>

      <form onSubmit={handleSubmit}>

        {/* FARMER NAME */}
        <div className="form-group">
          <label>Farmer's Name</label>
          <input
            type="text"
            name="farmerName"
            placeholder="e.g. Amina Bello"
            value={formData.farmerName}
            onChange={handleChange}
          />
          {errors.farmerName && (
            <p className="error">{errors.farmerName}</p>
          )}
        </div>

        {/* FARM NAME */}
        <div className="form-group">
          <label>Farm Name</label>
          <input
            type="text"
            name="farmName"
            placeholder="e.g. Green Acres Farm"
            value={formData.farmName}
            onChange={handleChange}
          />
          {errors.farmName && (
            <p className="error">{errors.farmName}</p>
          )}
        </div>

        {/* LOCATION */}
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="e.g. Ibadan, Oyo State"
            value={formData.location}
            onChange={handleChange}
          />
          {errors.location && (
            <p className="error">{errors.location}</p>
          )}
        </div>

        {/* NUMBER OF BIRDS */}
        <div className="form-group">
          <label>Number of Birds</label>
          <input
            type="text"
            name="numberOfBirds"
            placeholder="e.g. 500"
            value={formData.numberOfBirds}
            onChange={handleChange}
          />
          {errors.numberOfBirds && (
            <p className="error">{errors.numberOfBirds}</p>
          )}
        </div>

        {/* FEED AMOUNT */}
        <div className="form-group">
          <label>Feed Amount (kg)</label>
          <input
            type="text"
            name="feedAmount"
            placeholder="e.g. 120"
            value={formData.feedAmount}
            onChange={handleChange}
          />
          {errors.feedAmount && (
            <p className="error">{errors.feedAmount}</p>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button type="submit" className="submit-button">
          Submit Farm Data
        </button>

      </form>
    </div>
  );
}

export default FarmForm;