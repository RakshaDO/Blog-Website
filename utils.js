/**
 * Utility functions for the Blog Website
 */

// Generate a unique ID for new blogs
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Format date to a readable string (e.g., "May 6, 2026")
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Setup Toast Container if it doesn't exist
const setupToastContainer = () => {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  return container;
};

// Show a Toast Notification
const showToast = (message, type = 'success') => {
  const container = setupToastContainer();
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  // Icon based on type
  let icon = '';
  if (type === 'success') {
    icon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
  } else if (type === 'error') {
    icon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
  } else {
    icon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
  }

  toast.innerHTML = `
    ${icon}
    <span>${message}</span>
  `;
  
  container.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300); // Wait for transition
  }, 3000);
};

// Custom Confirm Popup
const showConfirmPopup = (title, message, onConfirm) => {
  // Check if modal already exists
  let modalOverlay = document.querySelector('.modal-overlay');
  if (modalOverlay) {
    modalOverlay.remove();
  }

  modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';
  
  modalOverlay.innerHTML = `
    <div class="modal">
      <h3 class="modal-title">${title}</h3>
      <p class="modal-desc">${message}</p>
      <div class="modal-actions">
        <button class="btn btn-secondary" id="cancel-btn">Cancel</button>
        <button class="btn btn-danger" id="confirm-btn">Delete</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modalOverlay);
  
  // Add active class for animation
  setTimeout(() => {
    modalOverlay.classList.add('active');
  }, 10);
  
  // Event Listeners
  const cancelBtn = modalOverlay.querySelector('#cancel-btn');
  const confirmBtn = modalOverlay.querySelector('#confirm-btn');
  
  const closeModal = () => {
    modalOverlay.classList.remove('active');
    setTimeout(() => {
      modalOverlay.remove();
    }, 200);
  };
  
  cancelBtn.addEventListener('click', closeModal);
  
  confirmBtn.addEventListener('click', () => {
    onConfirm();
    closeModal();
  });
};

// Extract ID from URL
const getQueryParam = (param) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

// Export functions for use in other modules
window.utils = {
  generateId,
  formatDate,
  showToast,
  showConfirmPopup,
  getQueryParam
};
