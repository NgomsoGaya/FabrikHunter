import React, { useState, useEffect } from 'react';
import './CSS/LoginSignup.css';

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
  }, []);

  // Track form start when an input field is focused
  const handleFormStart = () => {
    if (!window.digitalData) {
      console.error("digitalData is not initialized.");
      return;
    }

    if (!window.digitalData.form) {
      window.digitalData.form = {}; // Initialize form object if it doesn't exist
    }

    if (!Array.isArray(window.digitalData.event)) {
      window.digitalData.event = []; // Ensure event is an array
    }

    if (!window.digitalData.form.formStart) {
      window.digitalData.form.formStart = true;
      window.digitalData.event.push({
        event: "formStart",
        form: {
          formId: window.digitalData.form.formId || "loginSignupForm",
          formName: window.digitalData.form.formName || "Login/Signup Form"
        }
      });
      console.log("Form start tracked:", window.digitalData);
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

    if (!validateForm()) return;

    // Track form submit
    if (!window.digitalData) {
      console.error("digitalData is not initialized.");
      return;
    }

    if (!window.digitalData.form) {
      window.digitalData.form = {}; // Initialize form object if it doesn't exist
    }

    if (!Array.isArray(window.digitalData.event)) {
      window.digitalData.event = []; // Ensure event is an array
    }

    window.digitalData.form.formSubmit = true;
    window.digitalData.event.push({
      event: "formSubmit",
      form: {
        formId: window.digitalData.form.formId || "loginSignupForm",
        formName: window.digitalData.form.formName || "Login/Signup Form"
      }
    });
    console.log("Form submit tracked:", window.digitalData);

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
                onFocus={handleFormStart} // Track form start on focus
              />
            )}
            <input
              type="email"
              name="email"
              placeholder='Email Address'
              value={formData.email}
              onChange={handleChange}
              onFocus={handleFormStart} // Track form start on focus
            />
            <input
              type="password"
              name="password"
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
              onFocus={handleFormStart} // Track form start on focus
            />
          </div>

          {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
          {success && <p className="success-message" style={{ color: 'green' }}>{success}</p>}

          <button type="submit" className='submit'>
            Continue
          </button>

          <p className="loginsignup-login">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setSuccess('');
              setFormData({
                name: '',
                email: '',
                password: '',
                agreeToTerms: false
              });
            }}>
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

export const initializeDigitalData = () => {
  if (!window.digitalData) {
    window.digitalData = {
      event: [], // Ensure event is initialized as an array
      page: {
        name: "",
        category: "",
        type: "category"
      },
      user: {
        UserID: "",
        status: "",
        email: "",
        behavior: {
          viewedCategories: [],
          viewedProducts: [],
          interactedWith: []
        },
        mostViewed: {
          category: "",
          product: ""
        }
      },
      ecommerce: {
        cart: {
          productsAdded: [],
          cartValue: 0
        }
      },
      subscriptionBanner: {
        variant: "",
        clicked: false
      },
      personalization: {
        homepageBanner: "",
        emailRecommendation: ""
      },
      form: {
        formId: "loginSignupForm",
        formName: "Login/Signup Form",
        formStart: false,
        formSubmit: false
      }
    };
  } else if (!Array.isArray(window.digitalData.event)) {
    // If event exists but is not an array, reset it to an array
    window.digitalData.event = [];
  }
  console.log("DigitalData initialized:", window.digitalData);
};