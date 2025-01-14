import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useDigitalDataUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const updateDigitalData = () => {
      const path = location.pathname;
      const pageName = path.replace(/\//g, ":").substring(1) || "home";

      window.digitalData.page.pageInfo = {
        pageName: `eco-store:${pageName}`,
        destinationURL: window.location.href,
        referringURL: document.referrer,
        sysEnv: navigator.userAgent,
        internalPageName: pageName,
        pageID: `eco-store:${pageName}`,
        title: document.title,
      };

      if (location.pathname.includes("mens")) {
        window.digitalData.page.category = { categoryName: "men" };
      } else if (location.pathname.includes("womens")) {
        window.digitalData.page.category = { categoryName: "women" };
      } else if (location.pathname.includes("kids")) {
        window.digitalData.page.category = { categoryName: "kids" };
      }

      console.log("DigitalData updated for page:", window.digitalData.page.pageInfo);
    };

    updateDigitalData();
  }, [location]);
};
