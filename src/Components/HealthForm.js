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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data, like submitting it to a server
    console.log('Submitted Data:', { age, diseases });
  };

  return (
    <div className='form1'>
        <div className='title'>
        <h2>Health Form</h2>

        </div>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="age">Age:</label>
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
          <label htmlFor="sinus">
            <input
              type="checkbox"
              id="sinus"
              name="sinus"
              checked={diseases.sinus}
              onChange={handleDiseaseChange}
            />
            Sinus
          </label>
          <br />
          <label htmlFor="asthma">
            <input
              type="checkbox"
              id="asthma"
              name="asthma"
              checked={diseases.asthma}
              onChange={handleDiseaseChange}
            />
            Asthma
          </label>
          <br />
          <label htmlFor="bronchitis">
            <input
              type="checkbox"
              id="bronchitis"
              name="bronchitis"
              checked={diseases.bronchitis}
              onChange={handleDiseaseChange}
            />
            Bronchitis
          </label>
          <br />
          <label htmlFor="pulmonaryHypertension">
            <input
              type="checkbox"
              id="pulmonaryHypertension"
              name="pulmonaryHypertension"
              checked={diseases.pulmonaryHypertension}
              onChange={handleDiseaseChange}
            />
            Pulmonary Hypertension
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default HealthForm;
