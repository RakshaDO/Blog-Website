/**
 * Logic for the Home Page (index.html)
 */

document.addEventListener('DOMContentLoaded', () => {
  const blogGrid = document.getElementById('blog-grid');
  const searchInput = document.getElementById('search-input');
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  // State
  let currentCategory = 'All';
  let searchQuery = '';

  // 1. Render Posts
  const renderPosts = () => {
    // Show loader
    blogGrid.innerHTML = `
      <div class="loader-container grid-column-full">
        <div class="loader"></div>
      </div>
    `;

    // Simulate slight network delay for effect
    setTimeout(() => {
      const posts = window.storage.getPosts();
      
      // Filter logic
      const filteredPosts = posts.filter(post => {
        const matchesCategory = currentCategory === 'All' || post.category === currentCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              post.author.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });

      blogGrid.innerHTML = '';

      if (filteredPosts.length === 0) {
        // Empty State
        blogGrid.innerHTML = `
          <div class="empty-state">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="9" y1="15" x2="15" y2="15"></line></svg>
            <h3 class="empty-title">No blogs found</h3>
            <p class="empty-desc">Try adjusting your search or category filter, or create a new blog post!</p>
            <a href="create.html" class="btn btn-primary">Create New Blog</a>
          </div>
        `;
        return;
      }

      // Render Cards
      filteredPosts.forEach(post => {
        const card = document.createElement('article');
        card.className = 'blog-card';
        card.innerHTML = `
          <div class="card-image">
            <img src="${post.image}" alt="${post.title}" onerror="this.src='https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'">
            <span class="card-category">${post.category}</span>
          </div>
          <div class="card-content">
            <h3 class="card-title">${post.title}</h3>
            <p class="card-desc">${post.content.substring(0, 120)}...</p>
            
            <div class="card-meta">
              <div class="author-info">
                <div class="author-avatar">${post.author.charAt(0).toUpperCase()}</div>
                <div class="author-details">
                  <span class="author-name">${post.author}</span>
                  <span class="post-date">${window.utils.formatDate(post.date)}</span>
                </div>
              </div>
            </div>
            
            <div class="card-actions">
              <a href="post.html?id=${post.id}" class="read-more">
                Read More
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
              <div class="action-buttons">
                <a href="edit.html?id=${post.id}" class="icon-btn edit" title="Edit">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </a>
                <button class="icon-btn delete" title="Delete" data-id="${post.id}">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </button>
              </div>
            </div>
          </div>
        `;
        blogGrid.appendChild(card);
      });
    }, 400); // 400ms fake loading time
  };

  // 2. Search Functionality
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderPosts();
    });
  }

  // 3. Category Filter
  if (filterBtns) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add to clicked
        e.target.classList.add('active');
        
        currentCategory = e.target.dataset.category;
        renderPosts();
      });
    });
  }

  // 4. Delete Functionality (Event Delegation)
  if (blogGrid) {
    blogGrid.addEventListener('click', (e) => {
      const deleteBtn = e.target.closest('.delete');
      if (deleteBtn) {
        const id = deleteBtn.dataset.id;
        
        window.utils.showConfirmPopup(
          'Delete Blog Post',
          'Are you sure you want to delete this blog post? This action cannot be undone.',
          () => {
            const success = window.storage.deletePost(id);
            if (success) {
              window.utils.showToast('Blog post deleted successfully', 'success');
              renderPosts(); // Re-render the list
            } else {
              window.utils.showToast('Failed to delete blog post', 'error');
            }
          }
        );
      }
    });
  }

  // Initialize
  if (blogGrid) {
    renderPosts();
  }
});
