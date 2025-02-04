export const initializeDigitalData = () => {
  window.digitalData = {
    page: {
      pageInfo: {
        pageName: "",
        pageType: "",
        siteSection: ""
      },
      category: {
        primaryCategory: "",
        subCategory: "",
      }
    },
    user: {
      profile: {
        profileInfo: {
          profileID: "",
          userType: ""
        }
      }
    },
    style: {
      styleInfo: {
        styleID: "",
        category: "",
        name: "",
        price: ""
      },
      styleInteraction: {
        type: "",
        timestamp: "",
        durationInSeconds: ""
      }
    },
    subscription: {
      subscriptionInfo: {
        type: "",
        price: "",
        frequency: ""
      }
    },
  }
  console.log("DigitalData initialized:", window.digitalData);
};
