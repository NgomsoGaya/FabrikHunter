export const updatePersonalization = (data) => {
    if (!data) return;
  
    window.digitalData.personalization = {
      homepageBanner: data.homepageBanner || "",
      emailRecommendation: data.emailRecommendation || ""
    };
  
    // console.log("DigitalData updated for personalization:", window.digitalData.personalization);
  };