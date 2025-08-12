export const updateBannerInteraction = (variant, clicked = false) => {
    window.digitalData.subscriptionBanner = {
      variant,
      clicked
    };
  
    if (clicked) {
      window.digitalData.user.behavior.interactedWith.push('subscriptionBanner');
    }
  
    // console.log("DigitalData updated for banner:", window.digitalData.subscriptionBanner);
  };