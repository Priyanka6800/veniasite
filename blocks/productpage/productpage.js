export default function decorate(block) {

    function initializeSizeSelection() {
        const firstP = block.querySelector('.productpage > div:nth-child(3) > div:nth-child(2) > p:nth-child(1)');
        const secondP = block.querySelector('.productpage > div:nth-child(3) > div:nth-child(2) > p:nth-child(2)');
        
        if (firstP && secondP) {
            const sizeText = firstP.textContent.trim();
            const sizes = sizeText.split(' ').slice(2);
            
            firstP.textContent = "Fashion Size";
            
            const buttons = document.createElement('div');
            buttons.classList.add('buttons-container');
            
            const handleButtonClick = (size, button) => {
                secondP.innerHTML = `Selected Fashion Size: ${size}`;
                
                const allButtons = buttons.querySelectorAll('.size-button');
                allButtons.forEach(btn => btn.classList.remove('selected'));
                
                button.classList.add('selected');
                
                const addToCartButton = block.querySelector('.add-to-cart') || 
                                      block.querySelector('.productpage > div:last-child > div:last-child p:first-child');
                if (addToCartButton) {
                    addToCartButton.classList.add('enabled');
                    addToCartButton.classList.remove('disabled');
                }
            };
            
            sizes.forEach(size => {
                const button = document.createElement('button');
                button.textContent = size;
                button.classList.add('size-button');
                
                button.addEventListener('click', () => handleButtonClick(size, button));
                
                buttons.appendChild(button);
            });
            
            firstP.after(buttons);
        }
    }

    // Initialize quantity control
    function initializeQuantityControl() {
        let quantityDiv = Array.from(block.querySelectorAll('div')).find(div => 
            div.textContent.trim() === 'Quantity'
        );
        
        if (quantityDiv) {
            let quantityControl = document.createElement('div');
            quantityControl.className = 'quantity-control';
            
            let decrementButton = document.createElement('button');
            decrementButton.className = 'quantity-button decrement';
            decrementButton.textContent = '-';
            decrementButton.classList.add('disabled');
            
            let input = document.createElement('input');
            input.type = 'text';
            input.className = 'quantity-input';
            input.value = '1';
            input.readOnly = true;
            
            let incrementButton = document.createElement('button');
            incrementButton.className = 'quantity-button increment';
            incrementButton.textContent = '+';
            
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
            
            quantityControl.appendChild(decrementButton);
            quantityControl.appendChild(input);
            quantityControl.appendChild(incrementButton);
            
            quantityDiv.appendChild(quantityControl);
        }
    }

    // Initialize thumbnail gallery
    function initializeThumbnailGallery() {
        let thumbnailContainer = block.querySelector('.productpage > div:first-child');
        if (thumbnailContainer) {
            let thumbnails = thumbnailContainer.getElementsByTagName('img');
            let mainImage = block.querySelector('.productpage > div:nth-child(2) img');
            
            if (thumbnails.length > 0) {
                thumbnails[0].classList.add('active-thumbnail');
                
                Array.from(thumbnails).forEach(thumbnail => {
                    thumbnail.onclick = function() {
                        Array.from(thumbnails).forEach(thumb => thumb.classList.remove('active-thumbnail'));
                        this.classList.add('active-thumbnail');
                        
                        // Update main image if it exists
                        if (mainImage && this.src) {
                            mainImage.src = this.src;
                        }
                    };
                });
            }
        }
    }

    function initializeFavorites() {
        let favoritesButton = block.querySelector('.productpage > div:last-child > div:last-child p:last-child');
        
        if (favoritesButton) {
            favoritesButton.onclick = function() {
                alert('Please sign in before adding to favorites');
            };
        }
    }
    
    function initializeAddToCart() {
        let addToCartButton = block.querySelector('.productpage > div:last-child > div:last-child p:first-child');
        
        if (addToCartButton) {
            
            addToCartButton.classList.add('disabled');
            
            addToCartButton.onclick = function() {
                if (!this.classList.contains('disabled')) {
                    const selectedSize = block.querySelector('.productpage > div:nth-child(3) > div:nth-child(2) > p:nth-child(2)').textContent;
                    const quantity = block.querySelector('.quantity-input')?.value || '1';
                    alert(`Added to cart: ${quantity} item(s) with ${selectedSize}`);
                } else {
                    alert('Please select a size first');
                }
            };
        }
    }

    // Run all initializations
    initializeSizeSelection();
    initializeQuantityControl();
    initializeThumbnailGallery();
    initializeFavorites();
    initializeAddToCart();
}