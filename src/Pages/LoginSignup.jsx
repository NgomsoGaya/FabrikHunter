import React, { useState, useEffect } from 'react';
import './CSS/LoginSignup.css';

// A centralized function to push events to both data layers
const pushToDataLayers = (eventObject) => {
  if (window.digitalData && Array.isArray(window.digitalData.event)) {
    window.digitalData.event.push(eventObject);
  }
  if (window.eventDataLayer && Array.isArray(window.eventDataLayer.event)) {
    window.eventDataLayer.event.push(eventObject);
  }
  console.log("Event tracked in both data layers:", eventObject);
};

export const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeToTerms: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Initialize digitalData and eventDataLayer on component mount
  useEffect(() => {
    // Ensure eventDataLayer is initialized without a form object
    if (!window.eventDataLayer) {
        window.eventDataLayer = {
            event: [],
            page: {},
            user: {}
        };
    }
    
    // Ensure digitalData is initialized with the correct structure
    if (!window.digitalData) {
        window.digitalData = {
            event: [],
            form: {}, // Initialize with an empty form object
        };
    }
  }, []);

  // Track form start when an input field is focused
  const handleFormStart = (fieldName) => {
    // Check if form has already been started to prevent duplicate events
    if (window.digitalData && window.digitalData.form.formStart) {
        return;
    }

    // Set the form start flag on digitalData
    if (window.digitalData && window.digitalData.form) {
      window.digitalData.form.formStart = true;
    }

    // Create the event object
    const eventObject = {
      event: "formStart",
      form: {
        formId: "loginSignupForm",
        formName: "Login/Signup Form",
        firstInteractionField: fieldName,
        formStatus: 'started' // Add a status to the form event
      }
    };

    // Push the event to both data layers
    pushToDataLayers(eventObject);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    if (!isLogin && !formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.password.trim()) {
      setError('Password must not be empty');
      return false;
    }
    if (!isLogin && !formData.agreeToTerms) {
      setError('Please agree to the terms and conditions');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const isFormValid = validateForm();
    const formStatus = isFormValid ? 'success' : 'failure';

    // Create the event object
    const eventObject = {
      event: "formSubmit",
      form: {
        formId: "loginSignupForm",
        formName: "Login/Signup Form",
        formStatus: formStatus,
        formIsSubmitted: true
      }
    };
    
    // Push the event to both data layers
    pushToDataLayers(eventObject);

    // Reset the form state flags on digitalData
    if (window.digitalData && window.digitalData.form) {
      window.digitalData.form.formStart = false;
      window.digitalData.form.formSubmit = true;
    }
    
    if (!isFormValid) {
        setError('Please fill out the form correctly.');
        return;
    }

    setSuccess(isLogin ? 'Login successful!' : 'Sign up successful!');

    // Reset form data after successful submission
    if (!isLogin) {
      setFormData({
        name: '',
        email: '',
        password: '',
        agreeToTerms: false
      });
    }
  };

  const handleModeSwitch = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
    setFormData({
        name: '',
        email: '',
        password: '',
        agreeToTerms: false
    });

    const newMode = isLogin ? "signup" : "login";

    const eventObject = {
      event: "formModeSwitch",
      form: {
        formId: "loginSignupForm",
        formName: "Login/Signup Form",
        newMode: newMode
      }
    };
    pushToDataLayers(eventObject);

    // Reset form flags on digitalData after mode switch
    if (window.digitalData && window.digitalData.form) {
      window.digitalData.form.formStart = false;
      window.digitalData.form.formSubmit = false;
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="loginsignup-fields">
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder='Your Name'
                value={formData.name}
                onChange={handleChange}
                onFocus={() => handleFormStart('name')}
              />
            )}
            <input
              type="email"
              name="email"
              placeholder='Email Address'
              value={formData.email}
              onChange={handleChange}
              onFocus={() => handleFormStart('email')}
            />
            <input
              type="password"
              name="password"
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
              onFocus={() => handleFormStart('password')}
            />
          </div>

          {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
          {success && <p className="success-message" style={{ color: 'green' }}>{success}</p>}

          <button type="submit" className='submit'>
            Continue
          </button>

          <p className="loginsignup-login">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span onClick={handleModeSwitch}>
              {isLogin ? 'Sign Up Here' : 'Login Here'}
            </span>
          </p>

          {!isLogin && (
            <div className="loginsignup-agree">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
              />
              <p>By continuing, I agree to the terms of use & privacy policy</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};