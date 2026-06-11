# Modern Browser-Based Blog Website

A responsive, client-side only blog platform built with HTML5, CSS3, Vanilla JavaScript, and LocalStorage for data persistence. This project demonstrates full CRUD (Create, Read, Update, Delete) functionality without the need for a backend or database.

## Features

- **Full CRUD Operations**: Create, read, update, and delete blog posts.
- **Client-Side Storage**: Data is saved persistently in the browser using the LocalStorage API.
- **Real-time Search & Filtering**: Filter posts by category or search by title/author instantly.
- **Modern UI/UX**: Clean layout, glassmorphism elements, CSS variables for theming, smooth transitions, and hover effects.
- **Form Validation**: Strict validation for required fields, image preview, and a character counter.
- **Responsive Design**: Works perfectly across mobile, tablet, and desktop devices.
- **Notifications**: Custom toast notifications for success/error messages and confirmation popups for deletions.

## Technologies Used

- **HTML5**: Semantic markup.
- **CSS3**: Flexbox, CSS Grid, Custom Properties (Variables), Media Queries.
- **JavaScript (Vanilla/ES6)**: DOM manipulation, Event delegation, Modules, and LocalStorage API.

## File Structure

All project files are located in the root directory for simplicity.

### HTML
- `index.html`: The home page displaying the blog grid, hero section, and search controls.
- `create.html`: The form to write and publish a new blog post.
- `post.html`: The single reading view for a complete blog post.
- `edit.html`: The form pre-filled with data to update an existing blog post.

### CSS
- `style.css`: Global variables, resets, typography, navbar, footer, buttons, modals, and toasts.
- `home.css`: Styles specific to the home page (hero, search, grid, cards).
- `create.css`: Styles for the create and edit forms.
- `post.css`: Styles for the single post reading view.
- `responsive.css`: Media queries for tablet and mobile screens.

### JavaScript
- `utils.js`: Reusable helper functions (ID generation, date formatting, toast notifications, confirm popups).
- `storage.js`: Handles all interactions with the `localStorage` API, including initial dummy data generation.
- `app.js`: Global DOM interactions (navbar scroll effect, active links, scroll-to-top button).
- `home.js`: Logic for fetching posts, rendering the grid, real-time search, category filtering, and delete delegation.
- `create.js`: Logic for form validation, character counting, image preview, and saving new posts.
- `post.js`: Logic for extracting the ID from URL parameters and rendering a specific post.
- `edit.js`: Logic for pre-filling the form based on ID and updating the post data.

---

## How to Run Locally

Since this project relies purely on front-end technologies and LocalStorage, you can simply open the `index.html` file in your preferred modern web browser.

1. Download or clone the repository.
2. Navigate to the project folder.
3. Double-click on `index.html` (or serve it via a local extension like Live Server in VS Code).

---

## Deployment to GitHub Pages

Follow these step-by-step instructions to deploy this project for free using GitHub Pages.

### Prerequisites
- You must have [Git installed](https://git-scm.com/downloads) on your computer.
- You must have a [GitHub account](https://github.com/).

### Step 1: Initialize Git in your project folder
Open your terminal (Command Prompt, PowerShell, or Git Bash), navigate to the `Blog Website` folder, and run:

```bash
git init
```

### Step 2: Add all files to staging
```bash
git add .
```

### Step 3: Commit the files
```bash
git commit -m "Initial commit: Complete Blog Website"
```

### Step 4: Create a new repository on GitHub
1. Go to [GitHub](https://github.com/) and log in.
2. Click the **+** icon in the top right corner and select **New repository**.
3. Name your repository (e.g., `modern-blog-website`).
4. Ensure it is set to **Public**.
5. Do **NOT** initialize with a README, .gitignore, or license.
6. Click **Create repository**.

### Step 5: Link local repository to GitHub
Copy the URL of your new repository. In your terminal, run the following commands (replace the URL with your actual repository URL):

```bash
git remote add origin https://github.com/your-username/modern-blog-website.git
git branch -M main
```

### Step 6: Push the code to GitHub
```bash
git push -u origin main
```

### Step 7: Enable GitHub Pages
1. On your GitHub repository page, click on the **Settings** tab.
2. In the left sidebar, click on **Pages**.
3. Under the **Build and deployment** section, look for the **Source** dropdown.
4. Select **Deploy from a branch**.
5. Under the **Branch** section, select `main` from the dropdown and leave the folder as `/ (root)`.
6. Click **Save**.

### Step 8: Access your live website
Wait about 1-2 minutes for GitHub to build and deploy your site. 
Refresh the Settings > Pages tab. You will see a message saying:
**"Your site is live at https://your-username.github.io/modern-blog-website/"**

Click the link to view your live, browser-based blog platform!
