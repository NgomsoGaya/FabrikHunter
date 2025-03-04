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