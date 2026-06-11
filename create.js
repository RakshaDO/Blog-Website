/**
 * Logic for the Create Blog Page (create.html)
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('blog-form');
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');
  const categoryInput = document.getElementById('category');
  const imageInput = document.getElementById('image');
  const contentInput = document.getElementById('content');
  
  const charCounter = document.getElementById('char-counter');
  const currentCountSpan = document.getElementById('current-count');
  const imagePreview = document.getElementById('image-preview');
  const imagePlaceholder = document.getElementById('image-placeholder');
  const previewContainer = document.getElementById('preview-container');

  const MAX_CHARS = 5000;

  if (!form) return;

  // 1. Character Counter for Content
  contentInput.addEventListener('input', () => {
    const count = contentInput.value.length;
    currentCountSpan.textContent = count;
    
    if (count > MAX_CHARS) {
      charCounter.classList.add('limit-reached');
      contentInput.value = contentInput.value.substring(0, MAX_CHARS);
      currentCountSpan.textContent = MAX_CHARS;
    } else {
      charCounter.classList.remove('limit-reached');
    }
  });

  // 2. Image Preview
  imageInput.addEventListener('input', () => {
    const url = imageInput.value.trim();
    if (url) {
      imagePreview.src = url;
      imagePreview.style.display = 'block';
      imagePlaceholder.style.display = 'none';
      previewContainer.classList.add('has-image');
    } else {
      imagePreview.src = '';
      imagePreview.style.display = 'none';
      imagePlaceholder.style.display = 'flex';
      previewContainer.classList.remove('has-image');
    }
  });

  // Handle broken image links
  imagePreview.addEventListener('error', () => {
    imagePreview.style.display = 'none';
    imagePlaceholder.style.display = 'flex';
    previewContainer.classList.remove('has-image');
    window.utils.showToast('Invalid image URL provided', 'error');
  });

  // 3. Form Validation
  const validateField = (input, message) => {
    const formGroup = input.closest('.form-group');
    const errorEl = formGroup.querySelector('.error-message');
    
    if (!input.value.trim()) {
      input.classList.add('error');
      formGroup.classList.add('has-error');
      if (errorEl) errorEl.textContent = message;
      return false;
    } else {
      input.classList.remove('error');
      formGroup.classList.remove('has-error');
      return true;
    }
  };

  const removeErrorOnInput = (input) => {
    input.addEventListener('input', () => {
      input.classList.remove('error');
      input.closest('.form-group').classList.remove('has-error');
    });
  };

  removeErrorOnInput(titleInput);
  removeErrorOnInput(authorInput);
  removeErrorOnInput(categoryInput);
  removeErrorOnInput(contentInput);

  // 4. Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const isTitleValid = validateField(titleInput, 'Title is required');
    const isAuthorValid = validateField(authorInput, 'Author name is required');
    const isCategoryValid = validateField(categoryInput, 'Please select a category');
    const isContentValid = validateField(contentInput, 'Content cannot be empty');
    
    if (isTitleValid && isAuthorValid && isCategoryValid && isContentValid) {
      // Create new post object
      const newPostData = {
        title: titleInput.value.trim(),
        author: authorInput.value.trim(),
        category: categoryInput.value,
        image: imageInput.value.trim() || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        content: contentInput.value.trim()
      };

      // Save to LocalStorage
      window.storage.createPost(newPostData);
      
      // Show success toast and redirect
      window.utils.showToast('Blog post created successfully!', 'success');
      
      // Disable submit button
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Publishing...';

      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    } else {
      window.utils.showToast('Please fill in all required fields', 'error');
    }
  });
});
