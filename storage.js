/**
 * LocalStorage operations and Dummy Data initialization
 */

const STORAGE_KEY = 'blog_posts_data';

// Dummy Data to initialize if storage is empty
const dummyData = [
  {
    id: "post-1",
    title: "10 CSS Tricks Every Developer Should Know in 2026",
    author: "Sarah Drasner",
    category: "Development",
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: "CSS has evolved significantly over the years. With the widespread adoption of modern features, developers can now achieve complex layouts and animations with minimal code. In this article, we'll explore 10 cutting-edge CSS tricks including advanced CSS Grid techniques, container queries, :has() pseudo-class applications, and native CSS nesting. These tricks will not only make your code cleaner but also improve the performance of your web applications.",
    date: new Date().toISOString()
  },
  {
    id: "post-2",
    title: "The Future of Artificial Intelligence in Design",
    author: "Gary Simon",
    category: "Design",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: "AI is no longer just a buzzword; it's actively reshaping how designers work. From generating initial concepts to automating repetitive tasks, tools powered by machine learning are becoming indispensable. However, the role of the human designer remains crucial. AI acts as a powerful assistant, augmenting our creativity rather than replacing it. We'll look at how top agencies are integrating AI into their workflows and what skills you need to stay relevant.",
    date: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  {
    id: "post-3",
    title: "Why Vanilla JavaScript is Making a Comeback",
    author: "Chris Ferdinandi",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: "For years, Single Page Application frameworks dominated the frontend landscape. But there's a growing movement back to basics. With modern browser APIs, ES6+ features, and better performance metrics, many developers are realizing they might not need a heavy framework for every project. This post breaks down when to use Vanilla JS, when to reach for a framework, and how to build scalable applications without the bloat.",
    date: new Date(Date.now() - 172800000).toISOString() // 2 days ago
  }
];

// Initialize Storage
const initStorage = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyData));
  }
};

// Get all posts
const getPosts = () => {
  initStorage();
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Get single post by ID
const getPostById = (id) => {
  const posts = getPosts();
  return posts.find(post => post.id === id) || null;
};

// Create new post
const createPost = (postData) => {
  const posts = getPosts();
  const newPost = {
    ...postData,
    id: window.utils.generateId(),
    date: new Date().toISOString()
  };
  posts.unshift(newPost); // Add to beginning
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  return newPost;
};

// Update existing post
const updatePost = (id, updatedData) => {
  const posts = getPosts();
  const index = posts.findIndex(post => post.id === id);
  
  if (index !== -1) {
    posts[index] = { ...posts[index], ...updatedData };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return true;
  }
  return false;
};

// Delete post
const deletePost = (id) => {
  const posts = getPosts();
  const filteredPosts = posts.filter(post => post.id !== id);
  
  if (posts.length !== filteredPosts.length) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPosts));
    return true;
  }
  return false;
};

// Export functions
window.storage = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};
