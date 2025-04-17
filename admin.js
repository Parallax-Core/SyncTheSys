document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const content = document.getElementById("content");
  const pageTitle = document.getElementById("page-title");

  const sections = {
    announcement: generateAnnouncementSection,
    rates: generateRatesSection,
    summary: generateSummarySection,
  };

  function switchSection(section) {
    content.style.opacity = 0;
    setTimeout(() => {
      pageTitle.textContent = section.charAt(0).toUpperCase() + section.slice(1);
      content.innerHTML = sections[section]();

      if (section === "announcement") setupPostFeatures();
      if (section === "rates") setupRatesFeatures();
      if (section === "summary") setupSummaryFeatures();

      content.style.opacity = 1;
    }, 300);
  }

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      document.querySelector(".nav-link.active").classList.remove("active");
      link.classList.add("active");
      switchSection(link.dataset.section);
    });
  });

  switchSection("announcement");

  // Global vars for profile
  let currentProfileName = "Admin";
  let currentProfileImage = "";

    // ==========================
    // === Announcement Section ===
    // ==========================
  function generateAnnouncementSection() {
    return `
      <!-- Profile Section -->
    <div id="profile-settings">
      <img id="profile-preview" class="profile-preview" src="/Pictures/Logo.png" alt="Company Logo">
      <span class="static-name">Company Name</span>
    </div>

      <form id="post-form">
        <textarea id="post-input" placeholder="Post something..."></textarea>
        <div>
          <label for="image-input" class="file-btn">Choose File</label>
          <input type="file" id="image-input" accept="image/*" />
          <button type="button" class="bold-btn">Bold</button>
          <button type="submit">Post</button>
        </div>
      </form>
      <div id="posts-container"></div>
    `;
  }

  // ==========================
  // === Post Functionality ===
  // ==========================
  function setupPostFeatures() {
    const profilePreview = document.getElementById("profile-preview");

    const form = document.getElementById("post-form");
    const textarea = document.getElementById("post-input");
    const imageInput = document.getElementById("image-input");
    const postsContainer = document.getElementById("posts-container");
    const boldBtn = document.querySelector(".bold-btn");

    let editMode = null;

    boldBtn.addEventListener("click", () => {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;

      if (start !== end) {
        const bolded = text.substring(start, end);
        const newText = `${text.substring(0, start)}**${bolded}**${text.substring(end)}`;
        textarea.value = newText;
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = textarea.value;
      const file = imageInput.files[0];

      if (!text.trim() && !file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        const imageSrc = file ? reader.result : "";
        if (editMode) {
          updatePost(editMode, text, imageSrc);
          editMode = null;
        } else {
          createPost(text, imageSrc);
        }
        form.reset();
      };

      if (file) {
        reader.readAsDataURL(file);
      } else {
        if (editMode) {
          updatePost(editMode, text, "");
          editMode = null;
        } else {
          createPost(text, "");
        }
        form.reset();
      }
    });

    function createPost(text, imageSrc) {
      // Update profile values before creating post
      currentProfileName = "Company Name";
      currentProfileImage = "/Pictures/Logo.png"; // Same as above

      const post = document.createElement("div");
      post.className = "post";

      const profileHTML = `
        <div class="post-top">
          <div class="post-header">
            <img src="${currentProfileImage}" class="post-profile-img" alt="Profile Picture">
            <span class="post-author"><strong>${currentProfileName}</strong></span>
        </div>
        ${postActions()}
  </div>
`;


      post.innerHTML = profileHTML + formatPostContent(text, imageSrc);
      postsContainer.prepend(post);
      addPostEventListeners(post);
    }


    function updatePost(post, text, imageSrc) {
      post.querySelector(".post-content").innerHTML = formatText(text);
      const img = post.querySelector(".post-image img");
      if (imageSrc) {
        if (img) {
          img.src = imageSrc;
        } else {
          const imageElement = document.createElement("img");
          imageElement.src = imageSrc;
          post.querySelector(".post-content").appendChild(imageElement);
        }
      }
    }

    function formatPostContent(text, imageSrc) {
      let content = `<div class="post-content">${formatText(text)}</div>`;
      if (imageSrc) content += `<div class="post-image"><img src="${imageSrc}" alt="Post Image"/></div>`;
      return content;
    }

    function formatText(text) {
      const boldText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      const withLineBreaks = boldText.replace(/\n/g, "<br>");
      const withLinks = linkify(withLineBreaks);
      return withLinks;
    }

    function linkify(text) {
      const urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
      return text.replace(urlPattern, url => {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
      });
    }

    function postActions() {
      return `
        <div class="post-actions">
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;
    }

    function addPostEventListeners(post) {
      post.querySelector(".edit-btn").addEventListener("click", () => {
        textarea.value = post.querySelector(".post-content").innerText.trim();
        editMode = post;
        textarea.focus();
      });

      post.querySelector(".delete-btn").addEventListener("click", () => {
        post.remove();
      });
    }
  }
});
