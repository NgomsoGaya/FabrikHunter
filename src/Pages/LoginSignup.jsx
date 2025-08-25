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
  // This new state variable tracks the order of unique fields a user interacts with.
  const [interactionFields, setInteractionFields] = useState([]);

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
    // We use a flag on the data layers to prevent multiple formStart events.
    if (!window.digitalData.form.formStarted) {
      // Set the flag for both data layers
      window.digitalData.form.formStarted = true;
      window.eventDataLayer.form.formStarted = true;

      // Initialize the interactionFields array with the first field name
      setInteractionFields([fieldName]);

      // Create the consistent formStart event object
      const eventObject = {
        event: "formStart",
        form: {
          formId: "loginSignupForm",
          formName: "Login/Signup Form",
          formStatus: 'started',
          // The form has not been submitted yet
          formIsSubmitted: false,
          // The first field a user interacted with
          firstInteractionField: fieldName,
          // Track the sequence of field interactions
          interactionFields: [fieldName]
        }
      };

      // Push the event to both data layers
      pushToDataLayers(eventObject);
    }
  };

  // Handles changes to form inputs. It also tracks the order of field interactions.
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
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

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const isFormValid = validateForm();
    const formStatus = isFormValid ? 'success' : 'failure';

    // Create the consistent formSubmit event object
    const eventObject = {
      event: "formSubmit",
      form: {
        formId: "loginSignupForm",
        formName: "Login/Signup Form",
        formStatus: formStatus,
        // The form has been submitted
        formIsSubmitted: true,
        // Track the sequence of field interactions on submit
        interactionFields: interactionFields,
        // First interaction field is the first element of the array
        firstInteractionField: interactionFields[0] || null
      }
    };
    
    // Push the event to both data layers
    pushToDataLayers(eventObject);
    // Assuming _satellite is defined for a tool like Adobe Launch
    if (typeof _satellite !== 'undefined') {
      _satellite.track('globalFormComplete');
    }

    // Reset the form state flags on data layers after submission
    if (window.digitalData && window.digitalData.form) {
      window.digitalData.form.formStarted = false;
    }
    if (window.eventDataLayer && window.eventDataLayer.form) {
      window.eventDataLayer.form.formStarted = false;
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

  // Handles the switch between login and signup modes
  const handleModeSwitch = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
    // Reset all form data and interaction tracking on mode switch
    setFormData({
      name: '',
      email: '',
      password: '',
      agreeToTerms: false
    });
    setInteractionFields([]);

    const newMode = isLogin ? "signup" : "login";

    const eventObject = {
      event: "formModeSwitch",
      form: {
        formId: "loginSignupForm",
        formName: "Login/Signup Form",
        newMode: newMode,
        // The form is not submitted when the mode is switched
        formIsSubmitted: false
      }
    };
    pushToDataLayers(eventObject);

    // Reset form flags on data layers after mode switch
    if (window.digitalData && window.digitalData.form) {
      window.digitalData.form.formStarted = false;
    }
    if (window.eventDataLayer && window.eventDataLayer.form) {
      window.eventDataLayer.form.formStarted = false;
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
