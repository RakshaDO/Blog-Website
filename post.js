/**
 * Logic for Single Post Page (post.html)
 */

document.addEventListener('DOMContentLoaded', () => {
  const postId = window.utils.getQueryParam('id');
  const postContainer = document.getElementById('post-container');

  if (!postId) {
    window.location.href = 'index.html';
    return;
  }

  const post = window.storage.getPostById(postId);

  if (!post) {
    postContainer.innerHTML = `
      <div class="empty-state" style="margin-top: 4rem;">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        <h3 class="empty-title">Post Not Found</h3>
        <p class="empty-desc">The blog post you are looking for does not exist or has been deleted.</p>
        <a href="index.html" class="btn btn-primary">Return to Home</a>
      </div>
    `;
    return;
  }

  // Update Page Title
  document.title = `${post.title} - Blog Website`;

  // Render Post Content
  postContainer.innerHTML = `
    <article class="post-article">
      <img src="${post.image}" alt="${post.title}" class="post-hero-image" onerror="this.src='https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'">
      
      <div class="post-content-wrapper">
        <div class="post-header">
          <span class="post-category">${post.category}</span>
          <h1 class="post-title">${post.title}</h1>
          
          <div class="post-meta-large">
            <div class="post-author-block">
              <div class="post-author-avatar">${post.author.charAt(0).toUpperCase()}</div>
              <div class="post-author-details">
                <span class="post-author-name">${post.author}</span>
                <span class="post-date-large">Published on ${window.utils.formatDate(post.date)}</span>
              </div>
            </div>
            
            <div class="post-actions">
              <a href="edit.html?id=${post.id}" class="btn btn-secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                Edit
              </a>
              <button class="btn btn-danger" id="delete-post-btn" data-id="${post.id}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                Delete
              </button>
            </div>
          </div>
        </div>
        
        <div class="post-body">
          ${formatContent(post.content)}
        </div>
      </div>
    </article>
  `;

  // Helper to format content (basic text to paragraphs)
  function formatContent(text) {
    return text.split('\n\n').map(paragraph => `<p>${paragraph.trim()}</p>`).join('');
  }

  // Delete Action
  const deleteBtn = document.getElementById('delete-post-btn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      window.utils.showConfirmPopup(
        'Delete Blog Post',
        'Are you sure you want to delete this blog post? This action cannot be undone.',
        () => {
          window.storage.deletePost(post.id);
          window.utils.showToast('Blog post deleted successfully', 'success');
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 1500);
        }
      );
    });
  }
});
