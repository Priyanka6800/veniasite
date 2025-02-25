document.addEventListener("DOMContentLoaded", function() {
  // Dynamically assign classes to .productfelicia children
  const productContainer = document.querySelector(".productfelicia");
  if (productContainer) {
    const children = productContainer.children;
    // Assign the first two children fixed classes:
    if (children[0]) children[0].classList.add("thumbnails");
    if (children[1]) children[1].classList.add("main-image");
    
    // Create a container for details and move children 3-7 into it.
    const detailsWrapper = document.createElement("div");
    detailsWrapper.classList.add("details");
    
    // Since the HTMLCollection is live, move the third child repeatedly.
    while (productContainer.children.length > 2) {
      detailsWrapper.appendChild(productContainer.children[2]);
    }
    productContainer.appendChild(detailsWrapper);
    
    // Now, assign classes for each detail section inside .details
    const detailSections = detailsWrapper.children;
    if (detailSections[0]) detailSections[0].classList.add("title-price");
    if (detailSections[1]) detailSections[1].classList.add("fashion-color");
    if (detailSections[2]) detailSections[2].classList.add("fashion-size");
    if (detailSections[3]) detailSections[3].classList.add("quantity");
    if (detailSections[4]) detailSections[4].classList.add("actions");
  }
  
  // ----- Additional JS for Interactive Functionality -----
  
  // Thumbnail click: update main image source and highlight active thumbnail
  const thumbnails = document.querySelectorAll(".thumbnails img");
  const mainImage = document.querySelector(".main-image img");
  thumbnails.forEach(thumb => {
    thumb.addEventListener("click", function() {
      // Remove active class from all thumbnail containers
      thumbnails.forEach(t => t.parentElement.classList.remove("active"));
      this.parentElement.classList.add("active");
      if (mainImage) {
        mainImage.src = this.src;
      }
    });
  });
  
  // Color selection (assumes color boxes have class "color-box" and a data attribute 'data-color')
  const colorBoxes = document.querySelectorAll(".fashion-color .color-box");
  // Optionally, an element to show the selected color (should be present in your HTML)
  const selectedColorText = document.querySelector(".fashion-color .selected-color");
  
  colorBoxes.forEach(box => {
    box.addEventListener("click", function() {
      colorBoxes.forEach(b => b.classList.remove("selected"));
      this.classList.add("selected");
      if (selectedColorText) {
        selectedColorText.textContent = this.dataset.color || "Selected";
      }
    });
  });
  
  // Size selection (assumes size boxes have class "size-box")
  const sizeBoxes = document.querySelectorAll(".fashion-size .size-box");
  // Optionally, an element to show the selected size
  const selectedSizeText = document.querySelector(".fashion-size .selected-size");
  
  sizeBoxes.forEach(box => {
    box.addEventListener("click", function() {
      sizeBoxes.forEach(b => b.classList.remove("selected"));
      this.classList.add("selected");
      if (selectedSizeText) {
        selectedSizeText.textContent = this.textContent;
      }
    });
  });
  
  // Quantity controls (assumes minus button has classes "quantity-btn minus", plus button "quantity-btn plus",
  // and there’s an <input type="number"> for the quantity)
  const minusBtn = document.querySelector(".quantity .quantity-btn.minus");
  const plusBtn = document.querySelector(".quantity .quantity-btn.plus");
  const quantityInput = document.querySelector(".quantity input[type='number']");
  
  if (minusBtn && plusBtn && quantityInput) {
    minusBtn.addEventListener("click", function() {
      let value = parseInt(quantityInput.value, 10) || 1;
      if (value > 1) {
        quantityInput.value = value - 1;
      }
    });
    
    plusBtn.addEventListener("click", function() {
      let value = parseInt(quantityInput.value, 10) || 1;
      quantityInput.value = value + 1;
    });
  }
});
