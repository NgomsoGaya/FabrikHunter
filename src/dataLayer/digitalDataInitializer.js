export const initializeDigitalData = () => {
    window.digitalData = {
      page: {
        pageInfo: {
          pageName: "default",
          destinationURL: window.location.href,
          referringURL: document.referrer,
          sysEnv: navigator.userAgent,
          internalPageName: "default",
          pageID: "default",
          title: "Default Title",
        },
        category: {
          type: "default-category",
          version: "1.0",
        },
        attributes: {},
        components: [],
      },
      product: [],
      cart: {
        productsInCart: 0,
        cartValue: 0,
        cartItems: [],
      },
      user: [
        {
          profile: [
            {
              profileInfo: {
                userId: "guest",
                userType: "anonymous",
              },
              attributes: {
                loggedIn: false,
              },
            },
          ],
        },
      ],
      pageInstanceID: "default-instance",
      language: "en",
    };
  
    console.log("DigitalData initialized:", window.digitalData);
  };
  