//Main
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
        if (section === "summary") setupSummaryFeatures(); // ✅ Added this line for Summary
  
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
  
    // ==========================
    // === Announcement Section ===
    // ==========================
    function generateAnnouncementSection() {
      return `
        <form id="post-form">
          <textarea id="post-input" placeholder="Post something..."></textarea>
          <input type="file" id="image-input" accept="image/*" />
          <div>
            <button type="button" class="bold-btn">Bold</button>
            <button type="submit">Post</button>
          </div>
        </form>
        <div id="posts-container"></div>
      `;
    }
  
    function setupPostFeatures() {
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
        const bolded = text.substring(start, end);
        const newText = `${text.substring(0, start)}**${bolded}**${text.substring(end)}`;
        textarea.value = newText;
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
        const post = document.createElement("div");
        post.className = "post";
        post.innerHTML = formatPostContent(text, imageSrc) + postActions();
        postsContainer.prepend(post);
        addPostEventListeners(post);
      }
  
      function updatePost(post, text, imageSrc) {
        post.querySelector(".post-content").innerHTML = formatText(text);
        const img = post.querySelector("img");
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
        let content = `<div class="post-content">${formatText(text)}`;
        if (imageSrc) content += `<img src="${imageSrc}" alt="Post Image"/>`;
        content += `</div>`;
        return content;
      }
  
      function formatText(text) {
        return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>");
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
  
    // =====================
    // === Rates Section ===
    // =====================

// Define global variables for editing
let isEditingRate = false;
let editingRateIndex = null;

// Edit function
function editRateItem(index) {
  const rate = rates[index];
  document.getElementById('rate-name').value = rate.name;
  document.getElementById('rate-price').value = rate.price;
  document.getElementById('rate-visibility').checked = rate.visible;
  
  // Optional: Leave image input blank to avoid confusion
  // document.getElementById('rate-image').value = '';

  isEditingRate = true;
  editingRateIndex = index;
  openPopup();
}

// Form submit listener
ratePopup.addEventListener('submit', function(event) {
    event.preventDefault();
  
    const nameInput = document.getElementById('rate-name');
    const priceInput = document.getElementById('rate-price');
    const visibilityInput = document.getElementById('rate-visibility');
    const imageInput = document.getElementById('rate-image');
  
    const name = nameInput.value.trim();
    const price = priceInput.value.trim();
    const visible = visibilityInput.checked;
    const imageFile = imageInput.files[0];
  
    // Basic validation
    if (!name || !price) {
      alert('Please provide both name and price.');
      return;
    }
  
    if (isEditingRate && editingRateIndex !== null) {
      // Editing existing rate
      const existingRate = rates[editingRateIndex];
      existingRate.name = name;
      existingRate.price = price;
      existingRate.visible = visible;
  
      if (imageFile) {
        existingRate.image = URL.createObjectURL(imageFile);
      }
  
      isEditingRate = false;
      editingRateIndex = null;
    } else {
      // Adding new rate
      let imageUrl = '';
      if (imageFile) {
        imageUrl = URL.createObjectURL(imageFile);
      }
  
      const newRate = { name, price, visible, image: imageUrl };
      rates.push(newRate);
    }
  
    saveRates();
    renderRates();
    closePopup();
  
    // Reset image input manually to clear old file selection
    imageInput.value = '';
  });
  
  

// Close popup function
function closePopup() {
  ratePopup.classList.add('hidden');
  ratePopup.reset();
  isEditingRate = false;
  editingRateIndex = null;
}



    function generateRatesSection() {
      return `
        <div id="rates-summary"><strong>Summary:</strong> No items added yet.</div>
        <button id="open-popup-btn">Add New Item</button>
        <div class="popup hidden" id="rates-popup">
          <div class="popup-content">
            <span id="close-popup-btn" class="close-btn">&times;</span>
            <h3>Add New Item</h3>
            <input type="text" id="item-name" placeholder="Item Name" />
            <input type="number" id="item-price" placeholder="Price (₱)" />
            <input type="file" id="item-image" accept="image/*" />
            <label><input type="checkbox" id="item-visible" /> Visible</label>
            <button id="add-item-btn">Complete</button>
          </div>
        </div>
        <div class="rates-grid" id="rates-grid"></div>
      `;
    }
  
    function setupRatesFeatures() {
      const openPopupBtn = document.getElementById("open-popup-btn");
      const popup = document.getElementById("rates-popup");
      const closePopupBtn = document.getElementById("close-popup-btn");
      const addItemBtn = document.getElementById("add-item-btn");
      const ratesGrid = document.getElementById("rates-grid");
      const summary = document.getElementById("rates-summary");
  
      let items = [];
  
      openPopupBtn.addEventListener("click", () => popup.classList.remove("hidden"));
      closePopupBtn.addEventListener("click", () => popup.classList.add("hidden"));
  
      addItemBtn.addEventListener("click", () => {
        const name = document.getElementById("item-name").value;
        const price = document.getElementById("item-price").value;
        const imageFile = document.getElementById("item-image").files[0];
        const visible = document.getElementById("item-visible").checked;
  
        if (!name || !price) return alert("Please enter name and price.");
  
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageSrc = imageFile ? reader.result : "";
          const newItem = { name, price, visible, imageSrc };
          items.push(newItem);
          renderRates();
          popup.classList.add("hidden");
          resetPopup();
        };
  
        if (imageFile) {
          reader.readAsDataURL(imageFile);
        } else {
          const newItem = { name, price, visible, imageSrc: "" };
          items.push(newItem);
          renderRates();
          popup.classList.add("hidden");
          resetPopup();
        }
      });
  
      function resetPopup() {
        document.getElementById("item-name").value = "";
        document.getElementById("item-price").value = "";
        document.getElementById("item-image").value = "";
        document.getElementById("item-visible").checked = false;
      }
  
      function renderRates() {
        ratesGrid.innerHTML = "";
        summary.innerHTML = `<strong>Summary:</strong><br>${items.map(item => `${item.name} - ₱${item.price} - ${item.visible ? 'Visible' : 'Hidden'}`).join('<br>')}`;
  
        items.forEach((item, index) => {
          const itemDiv = document.createElement("div");
          itemDiv.className = "rate-item";
          itemDiv.draggable = true;
          itemDiv.dataset.index = index;
  
          itemDiv.innerHTML = `
            <div class="rate-actions">
              <button class="edit-item">Edit</button>
              <button class="delete-item">Delete</button>
            </div>
            <img src="${item.imageSrc}" alt="Item Image" />
            <div class="rate-details">
              <div class="name-price">
                <span>${item.name}</span>
                <span>₱${item.price}</span>
              </div>
              <label><input type="checkbox" ${item.visible ? "checked" : ""} disabled /> Visible</label>
            </div>
          `;
  
          itemDiv.querySelector(".delete-item").addEventListener("click", () => {
            items.splice(index, 1);
            renderRates();
          });
  
          itemDiv.querySelector(".edit-item").addEventListener("click", () => {
            document.getElementById("item-name").value = item.name;
            document.getElementById("item-price").value = item.price;
            document.getElementById("item-visible").checked = item.visible;
            popup.classList.remove("hidden");
            addItemBtn.onclick = () => {
              const newName = document.getElementById("item-name").value;
              const newPrice = document.getElementById("item-price").value;
              const newVisible = document.getElementById("item-visible").checked;
              const newImageFile = document.getElementById("item-image").files[0];
  
              const updateItem = (imageSrc = item.imageSrc) => {
                items[index] = { name: newName, price: newPrice, visible: newVisible, imageSrc };
                renderRates();
                popup.classList.add("hidden");
                resetPopup();
              };
  
              if (newImageFile) {
                const reader = new FileReader();
                reader.onloadend = () => updateItem(reader.result);
                reader.readAsDataURL(newImageFile);
              } else {
                updateItem();
              }
            };
          });
  
          ratesGrid.appendChild(itemDiv);
        });
      }
  
      // Drag and drop logic (optional improvement can be added later)
    }
// ==============================
// Summary Section
// ==============================

function generateSummarySection() {
    return `
      <div class="summary-navigation">
        <button class="summary-nav-btn active" data-section="section1">Trash To Cash</button>
        <button class="summary-nav-btn" data-section="section2">MRF</button>
        <button class="summary-nav-btn" data-section="section3">Rice to Rise</button>
      </div>
      <div class="summary-controls">
        <input type="text" id="summary-item-name" placeholder="Item Name" />
        <input type="number" id="summary-item-price" placeholder="Price (₱)" />
        <input type="number" id="summary-item-qty" placeholder="Quantity" />
        <button id="add-summary-item-btn">Complete</button>
      </div>
      <div class="summary-grid section1"></div>
      <div class="summary-grid section2" style="display: none;"></div>
      <div class="summary-grid section3" style="display: none;"></div>
    `;
  }
  
  function setupSummaryFeatures() {
    const addItemBtn = document.getElementById('add-summary-item-btn');
    const itemNameInput = document.getElementById('summary-item-name');
    const itemPriceInput = document.getElementById('summary-item-price');
    const itemQtyInput = document.getElementById('summary-item-qty');
  
    const summaryNavButtons = document.querySelectorAll('.summary-nav-btn');
    const summarySections = document.querySelectorAll('.summary-grid');
  
    let currentSectionClass = 'section1'; // default active section
  
    // Retrieve items for each section from localStorage or initialize
    const summaryItems = {
      section1: JSON.parse(localStorage.getItem('summaryItems_section1')) || [],
      section2: JSON.parse(localStorage.getItem('summaryItems_section2')) || [],
      section3: JSON.parse(localStorage.getItem('summaryItems_section3')) || [],
    };
  
    function renderSummaryItems(sectionClass) {
      const container = document.querySelector(`.summary-grid.${sectionClass}`);
      const items = summaryItems[sectionClass];
      container.innerHTML = '';
  
      if (items.length === 0) {
        return;
      }
  
      // Add header row
      container.innerHTML = `
        <div class="summary-header">Name</div>
        <div class="summary-header">Quantity</div>
        <div class="summary-header">Price</div>
      `;
  
      items.forEach(item => {
        container.innerHTML += `
          <div class="summary-item">${item.name}</div>
          <div class="summary-item">${item.qty}</div>
          <div class="summary-item">₱${item.price}</div>
        `;
      });
    }
  
    function saveSummaryItem() {
      const name = itemNameInput.value.trim();
      const price = itemPriceInput.value.trim();
      const qty = itemQtyInput.value.trim();
  
      if (!name || !price || !qty) {
        alert('Please fill in all fields.');
        return;
      }
  
      const newItem = { name, price, qty };
      summaryItems[currentSectionClass].push(newItem);
      localStorage.setItem(`summaryItems_${currentSectionClass}`, JSON.stringify(summaryItems[currentSectionClass]));
  
      itemNameInput.value = '';
      itemPriceInput.value = '';
      itemQtyInput.value = '';
  
      renderSummaryItems(currentSectionClass);
    }
  
    // Setup navigation buttons
    summaryNavButtons.forEach(button => {
      button.addEventListener('click', () => {
        summaryNavButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
  
        currentSectionClass = button.getAttribute('data-section');
  
        summarySections.forEach(section => {
          section.style.display = section.classList.contains(currentSectionClass) ? 'grid' : 'none';
        });
      });
    });
  
    addItemBtn.addEventListener('click', saveSummaryItem);
  
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        saveSummaryItem();
      }
    });
  
    // Initial render for all sections
    ['section1', 'section2', 'section3'].forEach(renderSummaryItems);
  }
  
  setupSummaryFeatures();
  
});
  