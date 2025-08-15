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

  // Initialize digitalData on component mount
  useEffect(() => {
    initializeDigitalData();
    // Also ensure eventDataLayer is initialized
    if (!window.eventDataLayer) {
        window.eventDataLayer = { event: [], page: {}, user: {} };
    }
  }, []);

  // Track form start when an input field is focused
  const handleFormStart = () => {
    // We'll rely on our new centralized function for pushing
    // First, check if the form start event has already been tracked
    if (window.digitalData && !window.digitalData.form.formStart) {
        window.digitalData.form.formStart = true;
        
        // Create the event object
        const eventObject = {
          event: "formStart",
          form: {
            formId: window.digitalData.form.formId || "loginSignupForm",
            formName: window.digitalData.form.formName || "Login/Signup Form"
          }
        };

        // Push to both data layers
        pushToDataLayers(eventObject);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    // ... your existing validation logic
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

    if (!validateForm()) {
        // Here you could also track a form submission failure event
        return;
    }

    // Track form submit
    if (window.digitalData) {
        window.digitalData.form.formSubmit = true;

        // Create the event object
        const eventObject = {
            event: "formSubmit",
            form: {
                formId: window.digitalData.form.formId || "loginSignupForm",
                formName: window.digitalData.form.formName || "Login/Signup Form"
            }
        };

        // Push to both data layers
        pushToDataLayers(eventObject);
    }

    // Simple success message instead of API call
    setSuccess(isLogin ? 'Login successful!' : 'Sign up successful!');

    // Reset form after successful submission
    if (!isLogin) {
      setFormData({
        name: '',
        email: '',
        password: '',
        agreeToTerms: false
      });
    }
  };

  // Additional handler for switching modes
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

    // Create and push the event for mode switching
    const eventObject = {
        event: "formModeSwitch",
        form: {
            formId: "loginSignupForm",
            formName: "Login/Signup Form",
            newMode: isLogin ? "signup" : "login"
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
                onFocus={handleFormStart}
              />
            )}
            <input
              type="email"
              name="email"
              placeholder='Email Address'
              value={formData.email}
              onChange={handleChange}
              onFocus={handleFormStart}
            />
            <input
              type="password"
              name="password"
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
              onFocus={handleFormStart}
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

// This function can remain outside the component as it doesn't rely on state
export const initializeDigitalData = () => {
    if (!window.digitalData) {
        window.digitalData = {
            event: [],
            page: { name: "", category: "", type: "category" },
            user: {},
            ecommerce: {},
            subscriptionBanner: {},
            personalization: {},
            form: {
                formId: "loginSignupForm",
                formName: "Login/Signup Form",
                formStart: false,
                formSubmit: false
            }
        };
    } else if (!Array.isArray(window.digitalData.event)) {
        window.digitalData.event = [];
    }
    console.log("DigitalData initialized:", window.digitalData);
};