import React, { useState } from 'react';
import './HealthForm.css';

function HealthForm() {
  const [age, setAge] = useState('');
  const [diseases, setDiseases] = useState({
    sinus: false,
    asthma: false,
    bronchitis: false,
    pulmonaryHypertension: false
  });
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleDiseaseChange = (e) => {
    const { name, checked } = e.target;
    setDiseases(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data, like submitting it to a server
    console.log('Submitted Data:', { age, diseases, selectedCountry });
  };

  return (
    <div className='form1'>
      <div className='title'>
        <h2>Health Form</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="age" style={{ fontSize: '1.2em' }}>Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={age}
            onChange={handleAgeChange}
          />
        </div>
        <div>
          <p>Select Diseases:</p>
          {Object.entries(diseases).map(([key, value]) => (
            <label key={key} htmlFor={key}>
              <input
                type="checkbox"
                id={key}
                name={key}
                checked={value}
                onChange={handleDiseaseChange}
              />
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
          ))}
        </div>
        <div>
          <label htmlFor="country" style={{ fontSize: '1.2em' }}>Select Country:</label>
          <select
            id="country"
            value={selectedCountry}
            onChange={handleCountryChange}
            style={{ fontSize: '1.2em' }}
          >
            <option value="">Select a country</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="UK">India</option>
            <option value="UK">Indonesia</option>
            <option value="UK">Fizzi</option>
            <option value="UK">Pakistan</option>
            <option value="UK">Ukrain</option>
            <option value="UK">Zimbave</option>
            {/* Add more options for other countries */}
          </select>
        </div>
        <button type="submit" className='but'>Submit</button>
      </form>
    </div>
  );
}

export default HealthForm;
