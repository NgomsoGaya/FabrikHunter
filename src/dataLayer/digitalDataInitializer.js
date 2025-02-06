export const initializeDigitalData = () => {
 if(!window.digitalData){
   window.digitalData = {
    event: "pageView",
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
    }
  };
 }
  console.log("DigitalData initialized:", window.digitalData);
};