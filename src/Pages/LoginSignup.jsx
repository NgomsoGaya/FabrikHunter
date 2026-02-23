import React, { useState, useEffect } from 'react';
// The CSS file is not provided, but we'll assume it exists for styling.
import './CSS/LoginSignup.css';

// A centralized function to push events to both data layers
const pushToDataLayers = (eventObject) => {
  if (window.digitalData && Array.isArray(window.digitalData)) {
    window.digitalData.push(eventObject);
  }
  if (window.eventDataLayer && Array.isArray(window.eventDataLayer)) {
    window.eventDataLayer.push(eventObject);
    
  }
};

// Function to clear only form-related events from the data layer
const clearFormEvents = () => {
  if (window.eventDataLayer && Array.isArray(window.eventDataLayer)) {
    // Remove only events that belong to this specific form instance
    window.eventDataLayer = window.eventDataLayer.filter(eventObject => {
      const formId = eventObject && eventObject.form && eventObject.form.formId;
      return formId !== 'loginSignupForm';
    });
    console.log("Cleared events for loginSignupForm from eventDataLayer.");
  }
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
  
  // Tracks the order of unique fields a user interacts with for the summary
  const [interactionFields, setInteractionFields] = useState([]);
  
  // NEW: Tracks which fields have already triggered an event to prevent keystroke spam
  const [touchedFields, setTouchedFields] = useState([]);
  
  const [formStarted, setFormStarted] = useState(false);

  useEffect(() => {
    if (!window.digitalData) window.digitalData = [];
    if (!window.eventDataLayer) window.eventDataLayer = [];

    // Push a single "formLoaded" event for this Login/Signup instance.
    const loadedEvent = {
      event: 'formLoaded',
      form: {
        formId: 'loginSignupForm',
        formName: 'Login/Signup Form',
        formStatus: 'Loaded',
        formIsSubmitted: false,
        formMode: isLogin ? 'login' : 'signup',
        timestamp: new Date().toISOString()
      }
    };
    pushToDataLayers(loadedEvent);

    return () => {
      clearFormEvents();
    };
  }, []);

  // --- EVENT HANDLERS ---

  // 1. Send the actual event logic
  const sendFieldInteractionEvent = (fieldName) => {
    const eventObject = {
      event: "formFieldInteraction",
      form: {
        formId: "loginSignupForm",
        formName: "Login/Signup Form",
        fieldName: fieldName,
        fieldType: getFieldType(fieldName),
        formMode: isLogin ? 'login' : 'signup',
        formIsSubmitted: false,
        interactionFields: [fieldName], 
      }
    };
    pushToDataLayers(eventObject);
  };

  // 2. Helper to determine field type
  const getFieldType = (fieldName) => {
    switch (fieldName) {
      case 'name': return 'text';
      case 'email': return 'email';
      case 'password': return 'password';
      case 'agreeToTerms': return 'checkbox';
      default: return 'unknown';
    }
  };

  // 3. Handle Form Start Logic
  // const handleFormStart = (fieldName) => {
  //   if (!formStarted) {
  //     setFormStarted(true);
  //     const eventObject = {
  //       event: "formStart",
  //       form: {
  //         formId: "loginSignupForm",
  //         formName: "Login/Signup Form",
  //         formStatus: 'started',
  //         formIsSubmitted: false,
  //         firstInteractionField: fieldName,
  //         interactionFields: [fieldName],
  //         formMode: isLogin ? 'login' : 'signup'
  //       }
  //     };
  //     pushToDataLayers(eventObject);
  //   }
  // };

  // 4. NEW: Centralized Tracking Logic (Called on Input Change)
  const trackInputInteraction = (fieldName) => {
    // Only proceed if we haven't tracked this field yet
    if (!touchedFields.includes(fieldName)) {
      
      // 1. Trigger Start if this is the very first action
     // handleFormStart(fieldName);

      // 2. Trigger the Field Interaction Event
      sendFieldInteractionEvent(fieldName);

      // 3. Mark this field as "touched" so subsequent keystrokes don't fire events
      setTouchedFields(prev => [...prev, fieldName]);

      // 4. Add to summary interaction list if unique
      if (!interactionFields.includes(fieldName)) {
        setInteractionFields(prev => [...prev, fieldName]);
      }
    }
  };

  // --- FORM HANDLERS ---

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // 1. Clear UI Errors
    if (error) setError('');

    // 2. Update React State (Standard behavior)
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // 3. TRIGGER TRACKING:
    // We pass the name to our new tracker. 
    // It internally checks if it should fire an event.
    trackInputInteraction(name);
  };

  const validateForm = () => {
    setError('');
    if (!isLogin && !formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password.trim()) {
      setError('Password is required');
      return false;
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(''); 

    const isFormValid = validateForm();
    const formStatus = isFormValid ? 'success' : 'failure';

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
        validationErrors: !isFormValid ? [error] : [],
      }
    };

    pushToDataLayers(eventObject);

    if (!isFormValid) return;

    setSuccess(isLogin ? 'Login successful!' : 'Sign up successful!');
    resetFormState();
  };

  const resetFormState = () => {
    //setFormStarted(false);
    setInteractionFields([]);
    setTouchedFields([]); // Reset tracked inputs so they can be tracked again next time
    setError('');
    setSuccess('');
  };

  const handleModeSwitch = () => {
    const newIsLogin = !isLogin;
    setIsLogin(newIsLogin);

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
                // onFocus Removed
                required={!isLogin}
              />
            )}
            <input
              type="email"
              name="email"
              placeholder='Email Address'
              value={formData.email}
              onChange={handleChange}
              // onFocus Removed
              required
            />
            <input
              type="password"
              name="password"
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
              // onFocus Removed
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
                // onFocus Removed
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