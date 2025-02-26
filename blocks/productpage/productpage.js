const firstP = document.querySelector('.productpage > div:nth-child(3) > div:nth-child(2) > p:nth-child(1)');
const secondP = document.querySelector('.productpage > div:nth-child(3) > div:nth-child(2) > p:nth-child(2)');

const sizeText = firstP.textContent.trim();
const sizes = sizeText.split(' ').slice(2); 

firstP.textContent = "Fashion Size";

const buttons = document.createElement('div');
buttons.classList.add('buttons-container');

const handleButtonClick = (size, button) => {

    secondP.innerHTML = `Selected Fashion Size: <strong>${size}</strong>`;

    const allButtons = document.querySelectorAll('.size-button');
    allButtons.forEach(btn => btn.classList.remove('selected'));

    button.classList.add('selected');

    const addToCartButton = document.querySelector('.add-to-cart'); 
    addToCartButton.disabled = false;
    addToCartButton.style.cursor = 'pointer';
};

sizes.forEach(size => {
    const button = document.createElement('button');
    button.textContent = size;
    button.classList.add('size-button');

    button.addEventListener('click', () => handleButtonClick(size, button));

    buttons.appendChild(button);
});

firstP.after(buttons);

export default function decorate(block) {
function initializeQuantityControl() {
    let quantityDiv = Array.from(document.getElementsByTagName('div')).find(div => 
        div.textContent === 'Quantity'
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

function initializeThumbnailGallery() {
    let thumbnailContainer = document.querySelector('.productpage > div:first-child');
    let thumbnails = thumbnailContainer.getElementsByTagName('img');

    thumbnails[0].classList.add('active-thumbnail');

    Array.from(thumbnails).forEach(thumbnail => {
        thumbnail.onclick = function() {

            Array.from(thumbnails).forEach(thumb => thumb.classList.remove('active-thumbnail'));

            this.classList.add('active-thumbnail');
        };
    });
}

function initializeFavorites() {
    let favoritesButton = document.querySelector('.productpage > div:last-child > div:last-child p:last-child');
    
    favoritesButton.onclick = function() {
        alert('Please sign in before adding to favorites');
    };
}

initializeQuantityControl();
initializeThumbnailGallery();
initializeFavorites();
}