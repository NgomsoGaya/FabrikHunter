// Ensure digitalData exists
window.digitalData = window.digitalData || [];

// console.log('Form tracking initialized - waiting for modal interactions');

// Function to track modal events
function trackModalEvents(modal) {
  if (!modal) return;

  // console.log('Modal detected in DOM, setting up listeners');

  // Track modal open event
  window.digitalData.push({
    event: 'formInteraction',
    formAction: 'open',
    formName: 'FabrikHunter-SignUp'
  });
  // console.log('digitalData updated: Modal detected as open', window.digitalData);

  // Listen for close button clicks
  const closeButton = modal.querySelector('[data-close-button]');
  if (closeButton) {
    closeButton.addEventListener('click', function () {
      window.digitalData.push({
        event: 'formInteraction',
        formAction: 'close_button',
        formName: 'FabrikHunter-SignUp'
      });
      // console.log('digitalData updated: Close button clicked', window.digitalData);
    });
    // console.log('Close button listener attached');
  }

  // Listen for outside click (assuming modal has a backdrop)
  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      window.digitalData.push({
        event: 'formInteraction',
        formAction: 'close_outside_click',
        formName: 'FabrikHunter-SignUp'
      });
      // console.log('digitalData updated: Modal closed by outside click', window.digitalData);
    }
  });

  // Listen for iframe load (if applicable)
  const iframe = modal.querySelector('iframe');
  if (iframe) {
    let initialLoadComplete = false;

    iframe.addEventListener('load', function () {
      if (!initialLoadComplete) {
        window.digitalData.push({
          event: 'formInteraction',
          formAction: 'form_loaded',
          formName: 'FabrikHunter-SignUp'
        });
        // console.log('digitalData updated: Form loaded in iframe', window.digitalData);
        initialLoadComplete = true;
      } else {
        window.digitalData.push({
          event: 'formInteraction',
          formAction: 'possible_submit',
          formName: 'FabrikHunter-SignUp'
        });
        // console.log('digitalData updated: Possible form submission (iframe reload)', window.digitalData);
      }
    });
    // console.log('Iframe load listener attached');
  }
}

// **Mutation Observer to Detect Modal**
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1 && node.matches('[data-form-modal]')) {
          // console.log('Modal added to DOM via MutationObserver');
          trackModalEvents(node);
        }
      });
    }
  });
});

// Start observing document body for modal creation
observer.observe(document.body, { childList: true, subtree: true });
// console.log('Mutation observer started to detect modal creation');
