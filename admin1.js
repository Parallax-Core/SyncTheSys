function generateRatesSection() {
  return `
    <div id="rates-summary" class="rates-summary-box">No items added yet.</div> <!-- Summary Top -->
    <div id="category-section" class="category-section">
      <button id="make-category-btn" class="btn make-category-btn">Make Category</button>
    </div>
  `;
}

function setupRatesFeatures() {
  const categorySection = document.getElementById("category-section");
  const summary = document.getElementById("rates-summary");

  let categories = [];

  // Make Category Button
  document.getElementById("make-category-btn").addEventListener("click", () => {
    const categoryName = prompt("Enter Category Name:");
    if (!categoryName) return;

    const categoryId = categoryName.toLowerCase().replace(/\s+/g, "-");
    if (categories.some(cat => cat.name === categoryName)) {
      alert("Category already exists.");
      return;
    }

    const newCategory = { name: categoryName, id: categoryId, items: [] };
    categories.push(newCategory);
    addCategoryToUI(newCategory);
  });

  function addCategoryToUI(category) {
    const container = document.createElement("div");
    container.className = "category-container";
    container.id = `category-${category.id}`;
    container.innerHTML = `
      <div class="category-header">
        <h3 class="category-title">${category.name}</h3>
        <button class="btn add-item-btn" data-category="${category.id}">Add New Item</button>
      </div>
      <div class="rates-grid" id="grid-${category.id}"></div>
    `;
    categorySection.appendChild(container);

    const addItemBtn = container.querySelector(".add-item-btn");
    addItemBtn.addEventListener("click", () => {
      openItemPopup(category.id);
    });
  }

  function openItemPopup(categoryId) {
    const popup = document.createElement("div");
    popup.className = "popup overlay";
    popup.innerHTML = `
      <div class="popup-content popup-box">
        <span class="close-btn">&times;</span>
        <h3 class="popup-title">Add New Item to ${getCategoryName(categoryId)}</h3>
        <input type="text" id="popup-item-name" class="popup-input" placeholder="Item Name" />
        <input type="text" id="popup-item-weight" class="popup-input" placeholder="Weight (e.g., 1kg)" />
        <input type="number" id="popup-item-price" class="popup-input" placeholder="Price (₱)" />
        
        <label for="popup-item-image" class="image-btn custom-file-label">Choose File</label>
        <input type="file" id="popup-item-image" class="popup-file" accept="image/*" />
        
        <label class="popup-visible">
          <input type="checkbox" id="popup-item-visible" class="popup-checkbox" />
          Visible
        </label>

        <button id="popup-add-item-btn" class="btn popup-add-btn">Complete</button>
      </div>
    `;
    document.body.appendChild(popup);

    popup.querySelector(".close-btn").addEventListener("click", () => popup.remove());

    popup.querySelector("#popup-add-item-btn").addEventListener("click", () => {
      const name = popup.querySelector("#popup-item-name").value.trim();
      const weight = popup.querySelector("#popup-item-weight").value.trim();
      const price = popup.querySelector("#popup-item-price").value.trim();
      const imageFile = popup.querySelector("#popup-item-image").files[0];
      const visible = popup.querySelector("#popup-item-visible").checked;

      if (!name || !price || !weight) return alert("Please fill all required fields.");

      const reader = new FileReader();
      reader.onloadend = () => {
        const imageSrc = imageFile ? reader.result : "";
        const newItem = { name, weight, price, visible, imageSrc, categoryId };
        const category = categories.find(cat => cat.id === categoryId);
        category.items.push(newItem);
        renderRates();
        popup.remove();
      };

      if (imageFile) reader.readAsDataURL(imageFile);
      else {
        const newItem = { name, weight, price, visible, imageSrc: "", categoryId };
        const category = categories.find(cat => cat.id === categoryId);
        category.items.push(newItem);
        renderRates();
        popup.remove();
      }
    });
  }

  function getCategoryName(id) {
    const cat = categories.find(c => c.id === id);
    return cat ? cat.name : "";
  }

  function renderRates() {
    categories.forEach(category => {
      const grid = document.getElementById(`grid-${category.id}`);
      if (!grid) return;
      grid.innerHTML = "";

      category.items.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "rate-item";
        itemDiv.innerHTML = `
        <img src="${item.imageSrc}" alt="Item Image" class="rate-img" />
        <div class="rate-details">
          <strong class="rate-name">${item.name}</strong>
          <div class="rate-meta">
            <span class="rate-weight">${item.weight}</span>
            <span class="rate-price">₱${item.price}</span>
          </div>
          <label class="rate-visibility">
            <input type="checkbox" ${item.visible ? "checked" : ""} disabled />
            Visible
          </label>
        </div>
      `;
        grid.appendChild(itemDiv);
      });
    });

    const allItems = categories.flatMap(cat => cat.items.map(item => ({
      category: cat.name,
      ...item
    })));

    if (allItems.length === 0) {
      summary.innerHTML = "No items added yet.";
      return;
    }

    const rows = allItems.map(i => `
      <tr>
        <td>${i.category}</td>
        <td>${i.name}</td>
        <td>${i.weight}</td>
        <td>₱${i.price}</td>
        <td>${i.visible ? "Visible" : "Hidden"}</td>
      </tr>
    `).join('');

    summary.innerHTML = `
      <strong>Summary:</strong>
      <div class="summary-table-wrapper">
        <table class="summary-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Name</th>
              <th>Weight</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  }
}
