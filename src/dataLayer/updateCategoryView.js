export default updateCategoryView = (category) => {
    if (!category) return;
  
    // Get all products in this category
    const categoryProducts = products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  
    window.digitalData.page.category = category;
  
    if (!window.digitalData.user.behavior.viewedCategories.includes(category)) {
      window.digitalData.user.behavior.viewedCategories.push(category);
    }
  
    // Update most viewed category
    const categoryViews = window.digitalData.user.behavior.viewedCategories.reduce((acc, cat) => {
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});
  
    const mostViewedCategory = Object.entries(categoryViews).reduce((a, b) => 
      b[1] > a[1] ? b : a
    )[0];
  
    window.digitalData.user.mostViewed.category = mostViewedCategory;
  
    console.log("DigitalData updated for category view:", window.digitalData);
    return categoryProducts; // Return category products for component use
  };