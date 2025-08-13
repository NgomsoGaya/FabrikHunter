class PageDataLayerManager {
    constructor() {
        this.config = {
            // Configuration for page categorization - FabrikHunter E-commerce
            pageCategories: {
                '/': 'homepage',
                '/home': 'homepage',
                '/men': 'category',
                '/women': 'category',
                '/kids': 'category',
                '/product': 'product',
                '/cart': 'cart',
                '/checkout': 'checkout',
                '/login': 'authentication',
                '/register': 'authentication',
                '/signup': 'authentication',
                '/account': 'account',
                '/profile': 'account',
                '/orders': 'account',
                '/wishlist': 'wishlist',
                '/search': 'search',
                '/about': 'about',
                '/contact': 'contact',
                '/help': 'help',
                '/faq': 'help',
                '/shipping': 'info',
                '/returns': 'info',
                '/privacy': 'info',
                '/terms': 'info'
            },
            // Business unit mapping for fashion categories
            businessUnits: {
                'men': 'mens_fashion',
                'women': 'womens_fashion', 
                'kids': 'kids_fashion',
                'baby': 'kids_fashion',
                'children': 'kids_fashion'
            },
            // Shopping categories for detailed tracking
            shoppingCategories: {
                'men': ['clothing', 'shoes', 'accessories', 'sportswear'],
                'women': ['clothing', 'shoes', 'accessories', 'bags', 'jewelry'],
                'kids': ['clothing', 'shoes', 'toys', 'accessories']
            }
        };
    }

    // Detect device type
    getDeviceType() {
        const width = window.innerWidth;
        if (width <= 768) return 'mobile';
        if (width <= 1024) return 'tablet';
        return 'desktop';
    }

    // Get domain name
    getDomainName() {
        return window.location.hostname;
    }

    // Detect login status - for e-commerce with dummy signup
    getLoginStatus() {
        // Method 1: Check for success message from dummy signup
        if (document.querySelector('.signup-success') || 
            document.querySelector('.success-message') ||
            document.querySelector('[data-signup-success="true"]')) {
            return 'signed_up'; // Special status for successful dummy signup
        }
        
        // Method 2: Check for authentication tokens (for future real auth)
        if (document.cookie.includes('auth_token') || 
            document.cookie.includes('user_session') ||
            document.cookie.includes('ecommerce_session')) {
            return 'logged_in';
        }
        
        // Method 3: Check localStorage for user data or cart persistence
        if (localStorage.getItem('user_data') || 
            localStorage.getItem('customer_info') ||
            localStorage.getItem('signed_up') === 'true') {
            return 'signed_up';
        }
        
        // Method 4: Check sessionStorage for temporary login state
        if (sessionStorage.getItem('user_session') || 
            sessionStorage.getItem('temp_login') ||
            sessionStorage.getItem('signup_success') === 'true') {
            return 'signed_up';
        }
        
        // Method 5: Check for user-specific DOM elements
        if (document.querySelector('.user-account') || 
            document.querySelector('.my-account') || 
            document.querySelector('[data-user-logged-in]') ||
            document.querySelector('.logout-btn') ||
            document.querySelector('.user-profile') ||
            document.querySelector('.account-menu')) {
            return 'logged_in';
        }
        
        // Method 6: Check URL patterns that might indicate user state
        const pathname = window.location.pathname.toLowerCase();
        if (pathname.includes('/account') || 
            pathname.includes('/profile') || 
            pathname.includes('/orders') ||
            pathname.includes('/my-')) {
            return 'logged_in';
        }
        
        return 'guest';
    }

    // Generate page name from URL and title - e-commerce specific
    getPageName() {
        const pathname = window.location.pathname;
        const title = document.title;
        
        // Handle React SPA routing patterns
        let pageName = pathname.replace(/^\/+|\/+$/g, '').replace(/\//g, '_');
        
        // Handle homepage
        if (!pageName || pageName === '') {
            pageName = 'home';
        }
        
        // E-commerce specific page name handling
        if (pathname.includes('/product/') || pathname.includes('/item/')) {
            // Extract product ID or slug for product pages
            const segments = pathname.split('/').filter(s => s);
            if (segments.length >= 2) {
                pageName = `product_${segments[segments.length - 1]}`;
            } else {
                pageName = 'product_detail';
            }
        } else if (pathname.includes('/category/')) {
            const segments = pathname.split('/').filter(s => s);
            if (segments.length >= 2) {
                pageName = `category_${segments[segments.length - 1]}`;
            }
        } else if (pathname === '/men' || pathname.startsWith('/men/')) {
            pageName = 'men_collection';
        } else if (pathname === '/women' || pathname.startsWith('/women/')) {
            pageName = 'women_collection';
        } else if (pathname === '/kids' || pathname.startsWith('/kids/')) {
            pageName = 'kids_collection';
        }
        
        return pageName.toLowerCase();
    }

    // Extract page subsections from URL path - e-commerce specific
    getPageSubSections() {
        const pathSegments = window.location.pathname.split('/').filter(segment => segment);
        
        // For e-commerce, we want to capture category and subcategory structure
        let pageSubSection1 = pathSegments[0] || '';
        let pageSubSection2 = pathSegments[1] || '';
        
        // Handle specific e-commerce patterns
        if (pathSegments.length >= 1) {
            const firstSegment = pathSegments[0].toLowerCase();
            
            // Main categories
            if (['men', 'women', 'kids'].includes(firstSegment)) {
                pageSubSection1 = firstSegment;
                pageSubSection2 = pathSegments[1] || ''; // subcategory like 'clothing', 'shoes'
            }
            // Product pages
            else if (firstSegment === 'product' || firstSegment === 'item') {
                pageSubSection1 = 'product';
                pageSubSection2 = pathSegments[1] || ''; // product ID or slug
            }
            // Other pages
            else {
                pageSubSection1 = firstSegment;
                pageSubSection2 = pathSegments[1] || '';
            }
        }
        
        return {
            pageSubSection1: pageSubSection1,
            pageSubSection2: pageSubSection2
        };
    }

    // Determine page category
    getPageCategory() {
        const pathname = window.location.pathname.toLowerCase();
        
        // Check exact matches first
        for (const [path, category] of Object.entries(this.config.pageCategories)) {
            if (pathname.startsWith(path)) {
                return category;
            }
        }
        
        // Fallback to first path segment
        const firstSegment = pathname.split('/')[1];
        return firstSegment || 'other';
    }

    // Detect business unit - for fashion e-commerce categories
    getSiteBusinessUnit() {
        const pathname = window.location.pathname.toLowerCase();
        
        // Method 1: Direct category mapping from URL
        for (const [category, businessUnit] of Object.entries(this.config.businessUnits)) {
            if (pathname.includes(`/${category}`) || pathname.startsWith(`/${category}`)) {
                return businessUnit;
            }
        }
        
        // Method 2: Check for product category in URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category') || urlParams.get('cat');
        if (category && this.config.businessUnits[category.toLowerCase()]) {
            return this.config.businessUnits[category.toLowerCase()];
        }
        
        // Method 3: Extract from breadcrumbs or navigation
        const breadcrumbs = document.querySelector('.breadcrumb') || 
                           document.querySelector('[data-breadcrumb]') ||
                           document.querySelector('.navigation-path');
        if (breadcrumbs) {
            const breadcrumbText = breadcrumbs.textContent.toLowerCase();
            for (const [category, businessUnit] of Object.entries(this.config.businessUnits)) {
                if (breadcrumbText.includes(category)) {
                    return businessUnit;
                }
            }
        }
        
        // Method 4: Check active navigation item
        const activeNav = document.querySelector('.nav-item.active') ||
                         document.querySelector('.navigation .active') ||
                         document.querySelector('[aria-current="page"]') ||
                         document.querySelector('.current-category');
        if (activeNav) {
            const navText = activeNav.textContent.toLowerCase();
            for (const [category, businessUnit] of Object.entries(this.config.businessUnits)) {
                if (navText.includes(category)) {
                    return businessUnit;
                }
            }
        }
        
        // Method 5: Check for data attributes
        const categoryElement = document.querySelector('[data-category]') ||
                               document.querySelector('[data-business-unit]') ||
                               document.querySelector('[data-section]');
        if (categoryElement) {
            const categoryValue = categoryElement.getAttribute('data-category') ||
                                 categoryElement.getAttribute('data-business-unit') ||
                                 categoryElement.getAttribute('data-section');
            if (categoryValue && this.config.businessUnits[categoryValue.toLowerCase()]) {
                return this.config.businessUnits[categoryValue.toLowerCase()];
            }
        }
        
        // Method 6: Special handling for specific pages
        if (pathname.includes('/cart') || pathname.includes('/checkout')) {
            return 'checkout_process';
        } else if (pathname.includes('/search')) {
            return 'product_search';
        } else if (pathname.includes('/product')) {
            return 'product_detail';
        }
        
        return 'general_store';
    }

    // Extract country from URL, domain, or other sources
    getSiteCountry() {
        // Method 1: URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const countryParam = urlParams.get('country') || urlParams.get('c');
        if (countryParam) return countryParam.toUpperCase();
        
        // Method 2: Subdomain (e.g., us.example.com, uk.example.com)
        const hostname = window.location.hostname;
        const parts = hostname.split('.');
        if (parts.length > 2) {
            const possibleCountry = parts[0].toUpperCase();
            // Basic country code validation (you might want to expand this)
            if (possibleCountry.length === 2) {
                return possibleCountry;
            }
        }
        
        // Method 3: Path-based (e.g., /en-us/, /en-gb/)
        const pathMatch = window.location.pathname.match(/\/[a-z]{2}-([a-z]{2})\//i);
        if (pathMatch) {
            return pathMatch[1].toUpperCase();
        }
        
        // Method 4: Meta tag
        const countryMeta = document.querySelector('meta[name="country"]');
        if (countryMeta) {
            return countryMeta.content.toUpperCase();
        }
        
        return 'US'; // Default fallback
    }

    // Extract language from URL, HTML lang attribute, etc.
    getSiteLanguage() {
        // Method 1: HTML lang attribute
        const htmlLang = document.documentElement.lang;
        if (htmlLang) {
            return htmlLang.toLowerCase();
        }
        
        // Method 2: URL path (e.g., /en/, /fr/, /es/)
        const langMatch = window.location.pathname.match(/^\/([a-z]{2}(-[a-z]{2})?)\//i);
        if (langMatch) {
            return langMatch[1].toLowerCase();
        }
        
        // Method 3: URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang') || urlParams.get('language');
        if (langParam) return langParam.toLowerCase();
        
        // Method 4: Meta tag
        const langMeta = document.querySelector('meta[name="language"]');
        if (langMeta) {
            return langMeta.content.toLowerCase();
        }
        
        return 'en'; // Default fallback
    }

    // Get website name - specific for FabrikHunter E-commerce
    getWebsiteName() {
        // Method 1: Meta tag
        const siteName = document.querySelector('meta[property="og:site_name"]');
        if (siteName) {
            return siteName.content;
        }
        
        // Method 2: Title tag (extract site name if format is "Page Title | Site Name")
        const title = document.title;
        if (title.includes('FabrikHunter')) {
            return 'FabrikHunter';
        }
        
        const titleParts = title.split(' | ');
        if (titleParts.length > 1) {
            return titleParts[titleParts.length - 1];
        }
        
        // Method 3: Check for site logo alt text or brand elements
        const logo = document.querySelector('img[alt*="FabrikHunter"]') || 
                    document.querySelector('.logo img') ||
                    document.querySelector('[class*="brand"] img') ||
                    document.querySelector('header img[alt]');
        if (logo && logo.alt) {
            return logo.alt.includes('FabrikHunter') ? 'FabrikHunter' : logo.alt;
        }
        
        // Method 4: Check for brand/store name in header
        const brandElement = document.querySelector('.brand-name') ||
                           document.querySelector('.store-name') ||
                           document.querySelector('header h1') ||
                           document.querySelector('[data-brand]');
        if (brandElement) {
            const brandText = brandElement.textContent || brandElement.getAttribute('data-brand');
            if (brandText && brandText.trim()) {
                return brandText.trim();
            }
        }
        
        // Method 5: Domain name as fallback
        return 'FabrikHunter';
    }

    // Generate website name code - specific for FabrikHunter
    getWebsiteNameCode() {
        return 'fabrikhunter_store';
    }

    // Main method to populate all page data
    populatePageData() {
        const subSections = this.getPageSubSections();
        
        window.eventDataLayer.page = {
            'deviceType': this.getDeviceType(),
            'domainName': this.getDomainName(),
            'loginStatus': this.getLoginStatus(),
            'pageName': this.getPageName(),
            'pageSubSection1': subSections.pageSubSection1,
            'pageSubSection2': subSections.pageSubSection2,
            'pageCategory': this.getPageCategory(),
            'siteBusinessUnit': this.getSiteBusinessUnit(),
            'siteCountry': this.getSiteCountry(),
            'siteLanguage': this.getSiteLanguage(),
            'websiteName': this.getWebsiteName(),
            'websiteNameCode': this.getWebsiteNameCode()
        };

        // Optional: Log for debugging
        console.log('Page Data Layer Updated:', window.eventDataLayer.page);
        
        // Optional: Dispatch custom event for other scripts to listen to
        window.dispatchEvent(new CustomEvent('pageDataLayerUpdated', {
            detail: window.eventDataLayer.page
        }));
    }

    // Update specific page data (useful for SPA navigation)
    updatePageData(updates) {
        Object.assign(window.eventDataLayer.page, updates);
        
        // Dispatch update event
        window.dispatchEvent(new CustomEvent('pageDataLayerUpdated', {
            detail: window.eventDataLayer.page
        }));
    }

    // Listen for page changes (useful for SPAs)
    initPageChangeListener() {
        // Listen for popstate (back/forward navigation)
        window.addEventListener('popstate', () => {
            setTimeout(() => this.populatePageData(), 100);
        });

        // Listen for pushstate/replacestate (programmatic navigation)
        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;
        
        history.pushState = function() {
            originalPushState.apply(history, arguments);
            setTimeout(() => pageDataLayer.populatePageData(), 100);
        };
        
        history.replaceState = function() {
            originalReplaceState.apply(history, arguments);
            setTimeout(() => pageDataLayer.populatePageData(), 100);
        };
    }
}

// Initialize and populate page data
const pageDataLayer = new PageDataLayerManager();

// React SPA specific initialization
function initializeForReactSPA() {
    // Wait for React to mount and render initial content
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => pageDataLayer.populatePageData(), 500);
        });
    } else {
        // DOM is already loaded, wait a bit for React to render
        setTimeout(() => pageDataLayer.populatePageData(), 500);
    }
}

// Initialize page data
initializeForReactSPA();

// Enhanced SPA navigation detection for React Router
pageDataLayer.initPageChangeListener();

// Additional React-specific event listeners
if (typeof window !== 'undefined') {
    // Listen for React Router navigation events
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    
    history.pushState = function() {
        originalPushState.apply(history, arguments);
        setTimeout(() => {
            pageDataLayer.populatePageData();
            console.log('React SPA Navigation - Page data updated');
        }, 300); // Allow time for React to re-render
    };
    
    history.replaceState = function() {
        originalReplaceState.apply(history, arguments);
        setTimeout(() => {
            pageDataLayer.populatePageData();
            console.log('React SPA Navigation - Page data updated');
        }, 300);
    };
    
    // Listen for popstate events (back/forward buttons)
    window.addEventListener('popstate', () => {
        setTimeout(() => {
            pageDataLayer.populatePageData();
            console.log('Browser Navigation - Page data updated');
        }, 300);
    });
    
    // E-commerce specific events
    window.addEventListener('cartUpdated', () => {
        pageDataLayer.updatePageData({
            'pageCategory': 'cart_interaction'
        });
    });
    
    window.addEventListener('signupSuccess', () => {
        pageDataLayer.updatePageData({
            'loginStatus': 'signed_up'
        });
    });
}

// Expose utility functions globally for manual updates
window.updatePageDataLayer = (updates) => pageDataLayer.updatePageData(updates);
window.refreshPageDataLayer = () => pageDataLayer.populatePageData();

// E-commerce specific helper functions
window.trackCategoryView = (category) => {
    const businessUnit = pageDataLayer.config.businessUnits[category.toLowerCase()] || 'general_store';
    pageDataLayer.updatePageData({
        'pageCategory': 'category',
        'siteBusinessUnit': businessUnit,
        'pageSubSection1': category
    });
};

window.trackProductView = (productId, category) => {
    pageDataLayer.updatePageData({
        'pageCategory': 'product',
        'pageName': `product_${productId}`,
        'pageSubSection1': 'product',
        'pageSubSection2': productId,
        'siteBusinessUnit': pageDataLayer.config.businessUnits[category] || 'product_detail'
    });
};

// Debug helper for development
window.debugPageDataLayer = () => {
    console.log('Current Page Data Layer:', window.eventDataLayer.page);
    return window.eventDataLayer.page;
};