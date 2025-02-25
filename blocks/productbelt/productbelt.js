// Size Selection Implementation
function initializeSizeSelection() {
    let fashionSizeDiv = Array.from(document.getElementsByTagName('div')).find(div => 
        div.querySelector('p')?.textContent === 'Fashion Size'
    );

    // Get add to cart button
    let addToCartButton = document.querySelector('.productbelt > div:last-child > div:last-child p:first-child');
    // Disable add to cart initially
    addToCartButton.classList.add('disabled');

    if (fashionSizeDiv) {
        let fashionSizeText = fashionSizeDiv.querySelector('p:first-child');
        let selectedSizeText = fashionSizeDiv.querySelector('p:last-child');

        let sizeButtonsContainer = document.createElement('div');
        sizeButtonsContainer.className = 'size-buttons';

        ['S', 'L', 'M'].forEach(size => {
            let button = document.createElement('button');
            button.className = 'size-button';
            button.textContent = size;
            
            button.onclick = function() {
                let allButtons = document.querySelectorAll('.size-button');
                allButtons.forEach(btn => btn.classList.remove('size-button-selected'));
                this.classList.add('size-button-selected');
                selectedSizeText.textContent = `Selected Fashion Size: ${size}`;
                
                // Enable add to cart when size is selected
                addToCartButton.classList.remove('disabled');
                addToCartButton.classList.add('enabled');
            };

            sizeButtonsContainer.appendChild(button);
        });

        fashionSizeText.after(sizeButtonsContainer);
    }
}

// Quantity Control Implementation
function initializeQuantityControl() {
    let quantityDiv = Array.from(document.getElementsByTagName('div')).find(div => 
        div.textContent === 'Quantity'
    );

    if (quantityDiv) {
        let quantityControl = document.createElement('div');
        quantityControl.className = 'quantity-control';

        // Create decrement button
        let decrementButton = document.createElement('button');
        decrementButton.className = 'quantity-button decrement';
        decrementButton.textContent = '-';
        decrementButton.classList.add('disabled'); // Initially disabled

        // Create input
        let input = document.createElement('input');
        input.type = 'text';
        input.className = 'quantity-input';
        input.value = '1';
        input.readOnly = true;

        // Create increment button
        let incrementButton = document.createElement('button');
        incrementButton.className = 'quantity-button increment';
        incrementButton.textContent = '+';

        // Add event listeners
        decrementButton.onclick = function() {
            if (!this.classList.contains('disabled')) {
                let currentValue = parseInt(input.value);
                if (currentValue > 1) {
                    input.value = currentValue - 1;
                    if (input.value === '1') {
                        this.classList.add('disabled');
                    }
                }
            }
        };

        incrementButton.onclick = function() {
            let currentValue = parseInt(input.value);
            input.value = currentValue + 1;
            decrementButton.classList.remove('disabled');
        };

        // Assemble controls
        quantityControl.appendChild(decrementButton);
        quantityControl.appendChild(input);
        quantityControl.appendChild(incrementButton);

        quantityDiv.appendChild(quantityControl);
    }
}

// Initialize Thumbnail Gallery
function initializeThumbnailGallery() {
    let thumbnailContainer = document.querySelector('.productbelt > div:first-child');
    let thumbnails = thumbnailContainer.getElementsByTagName('img');

    // Set first image as active
    thumbnails[0].classList.add('active-thumbnail');

    Array.from(thumbnails).forEach(thumbnail => {
        thumbnail.onclick = function() {
            // Remove active class from all thumbnails
            Array.from(thumbnails).forEach(thumb => thumb.classList.remove('active-thumbnail'));
            // Add active class to clicked thumbnail
            this.classList.add('active-thumbnail');
        };
    });
}

// Initialize Favorites
function initializeFavorites() {
    let favoritesButton = document.querySelector('.productbelt > div:last-child > div:last-child p:last-child');
    
    favoritesButton.onclick = function() {
        alert('Please sign in before adding to favorites');
    };
}

// Execute all initializations
initializeSizeSelection();
initializeQuantityControl();
initializeThumbnailGallery();
initializeFavorites();