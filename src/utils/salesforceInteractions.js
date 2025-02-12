// src/utils/salesforceInteractions.js
export const initializeSalesforceInteractions = () => {
    return SalesforceInteractions.init({
        cookieDomain: "fabrikhunter.onrender.com",
        corsOrigins: [
            "https://fabrikhunter.onrender.com",
            "http://fabrikhunter.onrender.com",
            "http://localhost:3000"
        ],
        credentials: 'include'
    }).then(() => {
        const sitemapConfig = {
            pageTypes: [
                {
                    name: "homePage",
                    isMatch: () => window.location.pathname === "/"
                },
                {
                    name: "categoryPage",
                    isMatch: () => /^\/(mens|womens|kids)/.test(window.location.pathname)
                },
                {
                    name: "productPage",
                    isMatch: () => /^\/product\//.test(window.location.pathname)
                },
                {
                    name: "cartPage",
                    isMatch: () => window.location.pathname === "/cart"
                }
            ],
            global: {
                contentZones: [
                    {
                        name: "navbar",
                        selector: "nav.navbar",
                        alternateSelectors: ["div.navbar", "header nav"]
                    }
                ]
            }
        };
        
        SalesforceInteractions.initSitemap(sitemapConfig);
    }).catch(error => {
        console.error('Failed to initialize Salesforce Interactions:', error);
    });
};