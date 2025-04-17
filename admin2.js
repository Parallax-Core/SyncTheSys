
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
