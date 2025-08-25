import React, { useState, useEffect } from 'react';
// The CSS file is not provided, but we'll assume it exists for styling.
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
  // isLogin determines whether the form is for login or sign up
  const [isLogin, setIsLogin] = useState(false);
  // formData stores the values of the form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeToTerms: false
  });
  // error and success messages for user feedback
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  // This tracks the order of unique fields a user interacts with.
  const [interactionFields, setInteractionFields] = useState([]);
  // Track if form has been started to prevent duplicate formStart events
  const [formStarted, setFormStarted] = useState(false);

  // Initialize digitalData and eventDataLayer on component mount.
  // This ensures the data layers are ready to accept events.
  useEffect(() => {
    if (!window.digitalData) {
      window.digitalData = { event: [], form: {} };
    }
    if (!window.eventDataLayer) {
      window.eventDataLayer = { event: [], form: {} };
    }
  }, []);

  // Tracks the start of the form. This event fires only once per form session.
  const handleFormStart = (fieldName) => {
    // Use component state to prevent multiple formStart events
    if (!formStarted) {
      setFormStarted(true);

      // Initialize the interactionFields array with the first field name
      setInteractionFields([fieldName]);

      // Create the consistent formStart event object
      const eventObject = {
        event: "formStart",
        form: {
          formId: "loginSignupForm",
          formName: "Login/Signup Form",
          formStatus: 'started',
          formIsSubmitted: false,
          firstInteractionField: fieldName,
          interactionFields: [fieldName],
          formMode: isLogin ? 'login' : 'signup' // Added form mode tracking
        }
      };

      // Push the event to both data layers
      pushToDataLayers(eventObject);
    } else {
      // If form already started, just track field interaction
      if (!interactionFields.includes(fieldName)) {
        setInteractionFields(prev => [...prev, fieldName]);
      }
    }
  };

  // Handles changes to form inputs. It also tracks the order of field interactions.
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Clear any existing errors when user starts typing
    if (error) {
      setError('');
    }
    
    // Update the form data state
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // If the field name is not already in our interactionFields array, add it.
    // This ensures we only store the order of unique interactions.
    if (!interactionFields.includes(name)) {
      setInteractionFields(prev => [...prev, name]);
    }
  };

  // Validates the form data before submission
  const validateForm = () => {
    // Clear previous errors
    setError('');
    
    if (!isLogin && !formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (!formData.password.trim()) {
      setError('Password is required');
      return false;
    }
    
    // Password strength validation for signup
    if (!isLogin && formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    
    if (!isLogin && !formData.agreeToTerms) {
      setError('Please agree to the terms and conditions');
      return false;
    }
    return true;
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(''); // Clear previous success messages

    const isFormValid = validateForm();
    const formStatus = isFormValid ? 'success' : 'failure';

    // Create the consistent formSubmit event object
    const eventObject = {
      event: "formSubmit",
      form: {
        formId: "loginSignupForm",
        formName: "Login/Signup Form",
        formStatus: formStatus,
        formIsSubmitted: true,
        interactionFields: interactionFields,
        firstInteractionField: interactionFields[0] || null,
        formMode: isLogin ? 'login' : 'signup',
        validationErrors: !isFormValid ? [error] : []
      }
    };
    
    // Push the event to both data layers
    pushToDataLayers(eventObject);

    if (!isFormValid) {
      return; // Error message already set in validateForm
    }

    setSuccess(isLogin ? 'Login successful!' : 'Sign up successful!');
    
    // Reset form tracking state after successful submission
    resetFormState();
  };

  // Helper function to reset form state
  const resetFormState = () => {
    setFormStarted(false);
    setInteractionFields([]);
    setError('');
    setSuccess('');
  };

  // Handles the switch between login and signup modes
  const handleModeSwitch = () => {
    const newIsLogin = !isLogin;
    setIsLogin(newIsLogin);
    
    // Reset all form data and tracking state on mode switch
    setFormData({
      name: '',
      email: '',
      password: '',
      agreeToTerms: false
    });
    resetFormState();

    const newMode = newIsLogin ? "login" : "signup";

    const eventObject = {
      event: "formModeSwitch",
      form: {
        formId: "loginSignupForm",
        formName: "Login/Signup Form",
        previousMode: isLogin ? "login" : "signup",
        newMode: newMode,
        formIsSubmitted: false
      }
    };
    pushToDataLayers(eventObject);
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
                required={!isLogin}
              />
            )}
            <input
              type="email"
              name="email"
              placeholder='Email Address'
              value={formData.email}
              onChange={handleChange}
              onFocus={() => handleFormStart('email')}
              required
            />
            <input
              type="password"
              name="password"
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
              onFocus={() => handleFormStart('password')}
              required
            />
          </div>

          {!isLogin && (
            <div className="loginsignup-agree">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                onFocus={() => handleFormStart('agreeToTerms')}
                required={!isLogin}
              />
              <p>By continuing, I agree to the terms of use & privacy policy</p>
            </div>
          )}

          {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
          {success && <p className="success-message" style={{ color: 'green' }}>{success}</p>}

          <button type="submit" className='submit'>
            Continue
          </button>

          <p className="loginsignup-login">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span onClick={handleModeSwitch} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
              {isLogin ? 'Sign Up Here' : 'Login Here'}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};