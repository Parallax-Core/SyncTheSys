document.addEventListener("DOMContentLoaded", () => {
  const postsContainer = document.getElementById("posts-container");

  // Function to render posts for the user
  function renderPostsForUser() {
    // Retrieve posts from localStorage
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    
    // Check if there are no posts
    if (posts.length === 0) {
      postsContainer.innerHTML = "<p>No posts available.</p>";
      return;
    }

    // Iterate over the posts and render each one
    posts.forEach(post => {
      const postElement = document.createElement("div");
      postElement.className = "post";

      const profileHTML = `
        <div class="post-top">
          <div class="post-header">
            <img src="${post.image}" class="post-profile-img" alt="Profile Picture">
            <span class="post-author"><strong>${post.name}</strong></span>
          </div>
        </div>
      `;

      postElement.innerHTML = profileHTML + formatPostContent(post.text, post.imageSrc);
      postsContainer.appendChild(postElement);
    });
  }

  // Function to format the post content (with text and optional image)
  function formatPostContent(text, imageSrc) {
    let content = `<div class="post-content">${formatText(text)}</div>`;
    if (imageSrc) content += `<div class="post-image"><img src="${imageSrc}" alt="Post Image"/></div>`;
    return content;
  }

  // Function to format text: add bold and links
  function formatText(text) {
    const boldText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    const withLineBreaks = boldText.replace(/\n/g, "<br>");
    const withLinks = linkify(withLineBreaks);
    return withLinks;
  }

  // Function to convert URLs in text to clickable links
  function linkify(text) {
    const urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(urlPattern, url => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
  }

  // Call renderPostsForUser to load and render posts
  renderPostsForUser();
});
