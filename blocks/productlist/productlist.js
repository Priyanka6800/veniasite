(async function () {

    const productListContainer = document.querySelector(".productlist");
    const carouselDotsContainer = document.createElement("div");
    carouselDotsContainer.classList.add("carousel-dots");
    document.querySelector(".productlist-wrapper").appendChild(carouselDotsContainer);

    let currentSlide = 0;
    let products = [];
    let productsPerSlide = getProductsPerSlide(); 

    try {
        const response = await fetch("http://localhost:3000/query-index.json");
        const data = await response.json();

        if (!data || !data.data || !Array.isArray(data.data)) {
            console.error("Invalid product data format:", data);
            return;
        }

        products = data.data;

        createCarousel(products);

        window.addEventListener("resize", () => {
            const newProductsPerSlide = getProductsPerSlide();
            if (newProductsPerSlide !== productsPerSlide) {
                productsPerSlide = newProductsPerSlide;
                createCarousel(products);
            }
        });

    } catch (error) {
        console.error("Error fetching product data:", error);
    }

    function getProductsPerSlide() {
        const width = window.innerWidth;
        if (width < 600) return 1; 
        if (width < 900) return 3;
        return 5;
    }

    function createCarousel(products) {

        productListContainer.innerHTML = "";
        carouselDotsContainer.innerHTML = "";

        const totalSlides = Math.ceil(products.length / productsPerSlide);

        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            if (i === 0) dot.classList.add("active");
            dot.addEventListener("click", () => showSlide(i));
            carouselDotsContainer.appendChild(dot);
        }

        showSlide(0);
    }

    function showSlide(index) {
        currentSlide = index;
        productListContainer.innerHTML = ""; 

        const start = index * productsPerSlide;
        const end = start + productsPerSlide;
        const visibleProducts = products.slice(start, end);

        visibleProducts.forEach(product => {
            const productContainer = document.createElement("div");
            productContainer.classList.add("product-container");

            const imageDiv = document.createElement("div");
            imageDiv.classList.add("product-image");
            const img = document.createElement("img");
            img.src = product.productimage;
            img.alt = product.productname;
            imageDiv.appendChild(img);

            const nameDiv = document.createElement("div");
            nameDiv.classList.add("product-name");
            nameDiv.textContent = product.productname;

            const priceDiv = document.createElement("div");
            priceDiv.classList.add("product-price");
            priceDiv.textContent = `${product.productprice}`;

            const actionDiv = document.createElement("div");
            actionDiv.classList.add("action-buttons");

            const cartButton = document.createElement("button");
            cartButton.classList.add("add-to-cart");
            cartButton.textContent = "ADD TO CART";

            const wishlistIcon = document.createElement("img");
            wishlistIcon.classList.add("wishlist-icon");
            wishlistIcon.src = "icons/wishlist.svg";
            wishlistIcon.alt = "Wishlist";

            actionDiv.appendChild(cartButton);
            actionDiv.appendChild(wishlistIcon);

            productContainer.appendChild(imageDiv);
            productContainer.appendChild(nameDiv);
            productContainer.appendChild(priceDiv);
            productContainer.appendChild(actionDiv);

            productListContainer.appendChild(productContainer);

        });

        document.querySelectorAll(".dot").forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
    }
})();
