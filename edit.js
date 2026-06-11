/**
 * Logic for Edit Blog Page (edit.html)
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

  // 1. Load Data
  const postId = window.utils.getQueryParam('id');
  
  if (!postId) {
    window.location.href = 'index.html';
    return;
  }

  const post = window.storage.getPostById(postId);

  if (!post) {
    window.utils.showToast('Post not found', 'error');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
    return;
  }

  // 2. Pre-fill Form
  titleInput.value = post.title;
  authorInput.value = post.author;
  categoryInput.value = post.category;
  imageInput.value = post.image;
  contentInput.value = post.content;

  // Initial Char Count
  currentCountSpan.textContent = post.content.length;

  // Initial Image Preview
  if (post.image) {
    imagePreview.src = post.image;
    imagePreview.style.display = 'block';
    imagePlaceholder.style.display = 'none';
    previewContainer.classList.add('has-image');
  }

  // 3. UI Interactions (Counter & Preview)
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

  imagePreview.addEventListener('error', () => {
    imagePreview.style.display = 'none';
    imagePlaceholder.style.display = 'flex';
    previewContainer.classList.remove('has-image');
    window.utils.showToast('Invalid image URL provided', 'error');
  });

  // 4. Form Validation
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

  // 5. Form Submission (Update)
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const isTitleValid = validateField(titleInput, 'Title is required');
    const isAuthorValid = validateField(authorInput, 'Author name is required');
    const isCategoryValid = validateField(categoryInput, 'Please select a category');
    const isContentValid = validateField(contentInput, 'Content cannot be empty');
    
    if (isTitleValid && isAuthorValid && isCategoryValid && isContentValid) {
      const updatedData = {
        title: titleInput.value.trim(),
        author: authorInput.value.trim(),
        category: categoryInput.value,
        image: imageInput.value.trim(),
        content: contentInput.value.trim()
      };

      const success = window.storage.updatePost(postId, updatedData);
      
      if (success) {
        window.utils.showToast('Blog post updated successfully!', 'success');
        
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Updating...';

        setTimeout(() => {
          window.location.href = `post.html?id=${postId}`;
        }, 1500);
      } else {
        window.utils.showToast('Failed to update post.', 'error');
      }
    } else {
      window.utils.showToast('Please fill in all required fields', 'error');
    }
  });
});
