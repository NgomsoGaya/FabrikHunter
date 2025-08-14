// Form DataLayer Tracking for FabrikHunter
// This file should be imported and initialized in your main App component

// Initialize form section of eventDataLayer
window.eventDataLayer = window.eventDataLayer || {};

window.eventDataLayer.form = {
    'formName': '',
    'fieldName': '',
    'formStatus': '',
    'formIsSubmitted': false
};

// Integration with existing digitalData structure
window.digitalData = window.digitalData || {
    event: [],
    form: {
        formId: "",
        formName: "",
        formStart: false,
        formSubmit: false
    }
};

// Form DataLayer Manager
class FormDataLayerManager {
    constructor() {
        this.currentForm = null;
        this.currentField = null;
        this.hasTrackedFormStart = false;
    }

    // Update the form dataLayer - integrated with digitalData
    updateFormDataLayer(data) {
        // Store current form and field for reference
        if (data.formName) this.currentForm = data.formName;
        if (data.fieldName) this.currentField = data.fieldName;
        
        // Update the eventDataLayer
        Object.assign(window.eventDataLayer.form, data);
        
        // Also update digitalData for consistency with existing implementation
        if (window.digitalData && window.digitalData.form) {
            window.digitalData.form.formId = data.formName + 'Form';
            window.digitalData.form.formName = this.getFormDisplayName(data.formName);
            
            // Update form status flags
            if (data.formStatus === 'form_started' || data.formStatus === 'field_focused') {
                window.digitalData.form.formStart = true;
            }
            if (data.formIsSubmitted) {
                window.digitalData.form.formSubmit = true;
            }
            
            // Push events to digitalData.event array
            if (!Array.isArray(window.digitalData.event)) {
                window.digitalData.event = [];
            }
            
            // Push relevant events
            if (data.formStatus === 'field_focused' && !this.hasTrackedFormStart) {
                window.digitalData.event.push({
                    event: "formStart",
                    form: {
                        formId: window.digitalData.form.formId,
                        formName: window.digitalData.form.formName,
                        fieldName: data.fieldName
                    }
                });
                this.hasTrackedFormStart = true;
            }
            
            if (data.formIsSubmitted && data.formStatus === 'form_submitted') {
                window.digitalData.event.push({
                    event: "formSubmit",
                    form: {
                        formId: window.digitalData.form.formId,
                        formName: window.digitalData.form.formName
                    }
                });
            }
            
            if (data.formStatus === 'form_success') {
                window.digitalData.event.push({
                    event: "formSuccess",
                    form: {
                        formId: window.digitalData.form.formId,
                        formName: window.digitalData.form.formName
                    }
                });
            }
        }
        
        // Log for debugging
        console.log('Form DataLayer Updated:', window.eventDataLayer.form);
        console.log('DigitalData Updated:', window.digitalData);
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('formDataLayerUpdated', {
            detail: {
                eventDataLayer: window.eventDataLayer.form,
                digitalData: window.digitalData
            }
        }));
    }

    // Helper method to get display name for forms
    getFormDisplayName(formName) {
        const displayNames = {
            'signup': 'Sign Up Form',
            'login': 'Login Form',
            'loginSignup': 'Login/Signup Form',
            'newsletter': 'Newsletter Subscription',
            'contact': 'Contact Form',
            'search': 'Search Form'
        };
        return displayNames[formName] || 'Form';
    }
}

// Initialize form tracking
const formDataLayer = new FormDataLayerManager();

// React component integration helpers for FabrikHunter LoginSignup
window.reactFormHelpers = {
    // Enhanced integration with your existing component
    onLoginSignupFormStart: (isLogin, fieldName = '') => {
        const formName = isLogin ? 'login' : 'signup';
        formDataLayer.updateFormDataLayer({
            formName: formName,
            fieldName: fieldName,
            formStatus: 'field_focused',
            formIsSubmitted: false
        });
    },
    
    onFormModeSwitch: (isLogin) => {
        const formName = isLogin ? 'login' : 'signup';
        formDataLayer.updateFormDataLayer({
            formName: formName,
            fieldName: '',
            formStatus: 'form_started',
            formIsSubmitted: false
        });
        // Reset form start tracking
        formDataLayer.hasTrackedFormStart = false;
    },
    
    onFieldInteraction: (fieldName, status = 'field_focused', isLogin = false) => {
        const formName = isLogin ? 'login' : 'signup';
        formDataLayer.updateFormDataLayer({
            formName: formName,
            fieldName: fieldName,
            formStatus: status,
            formIsSubmitted: false
        });
    },
    
    onFormSubmit: (isLogin, success = true) => {
        const formName = isLogin ? 'login' : 'signup';
        formDataLayer.updateFormDataLayer({
            formName: formName,
            fieldName: '',
            formStatus: success ? 'form_success' : 'form_error',
            formIsSubmitted: true
        });
    },
    
    onValidationError: (fieldName, isLogin = false) => {
        const formName = isLogin ? 'login' : 'signup';
        formDataLayer.updateFormDataLayer({
            formName: formName,
            fieldName: fieldName,
            formStatus: 'validation_failed',
            formIsSubmitted: false
        });
    }
};

// Debug helper
window.debugFormDataLayer = () => {
    console.log('Current Form Data Layer:', window.eventDataLayer.form);
    return window.eventDataLayer.form;
};

export { formDataLayer };