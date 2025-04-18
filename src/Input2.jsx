import React, { useState, useEffect } from 'react';

const Input2 = () => {
  const [searchQuery, setSearchQuery] = useState('london');
  const [suggestions, setSuggestions] = useState([]);
  const apiKey = 'b97575b21c57260bfb787231c7ca4e08';

  useEffect(() => {
    const getLocationSuggestions = async () => {
      try {
        if (!searchQuery) return;
        const suggestionRes = await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
            searchQuery
          )}&limit=5&appid=${apiKey}`
        );
        const suggestionData = await suggestionRes.json();
        console.log(suggestionData);
        setSuggestions(suggestionData);
      } catch (error) {
        console.error('Error fetching input suggestion: ', error);
      }
    };

    // Debounce API call with a 500ms delay
    const timer = setTimeout(getLocationSuggestions, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, apiKey]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log("Form submitted with query:", searchQuery);
  };

  return (
    <div className="page-container" style={styles.pageContainer}>
      <form className="form-input" onSubmit={submitForm} style={styles.form}>
        <input
          type="text"
          name="inputCity"
          placeholder="City Name"
          value={searchQuery}
          onChange={handleInputChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <button type="button" style={styles.button}>
          <i className="fa-solid fa-location-dot"></i>
        </button>
      </form>

      <div className="suggestions" style={styles.suggestions}>
        {suggestions.length > 0 ? (
          <ul>
            {suggestions.map((item, index) => (
              <li key={`${item.name}-${index}`}>
                {item.name}
                {item.state ? `, ${item.state}` : ''}, {item.country}
              </li>
            ))}
          </ul>
        ) : (
          <p>No suggestions found.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    fontFamily: 'Arial, sans-serif',
    padding: '2rem',
    maxWidth: '600px',
    margin: '0 auto'
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem'
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    flex: 1
  },
  button: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    cursor: 'pointer'
  },
  suggestions: {
    backgroundColor: '#f9f9f9',
    padding: '1rem',
    borderRadius: '4px'
  }
};

export default Input2;
