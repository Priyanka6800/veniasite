(async function () {
    const productListContainer = block.querySelector(".productlist");
    const carouselDotsContainer = decorate(block.createElement("div"))
        .addClass("carousel-dots")
        .appendTo(block.querySelector(".productlist-wrapper"))
        .element;

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

        products = data.data.filter(product => product.path === 'products');

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
            const dotIndex = i;
            decorate(block.createElement("div"))
                .addClass("dot")
                .addClass(i === 0 ? "active" : "")
                .onClick(() => showSlide(dotIndex))
                .appendTo(carouselDotsContainer);
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
            const productContainer = decorate(block.createElement("div"))
                .addClass("product-container");

            const imageDiv = decorate(block.createElement("div"))
                .addClass("product-image");
            
            decorate(block.createElement("img"))
                .setAttr("src", product.productimage)
                .setAttr("alt", product.productname)
                .appendTo(imageDiv.element);

            const nameDiv = decorate(block.createElement("div"))
                .addClass("product-name")
                .setText(product.productname);

            const priceDiv = decorate(block.createElement("div"))
                .addClass("product-price")
                .setText(`${product.productprice}`);

            const actionDiv = decorate(block.createElement("div"))
                .addClass("action-buttons");

            decorate(block.createElement("button"))
                .addClass("add-to-cart")
                .setText("ADD TO CART")
                .appendTo(actionDiv.element);

            decorate(block.createElement("img"))
                .addClass("wishlist-icon")
                .setAttr("src", "icons/wishlist.svg")
                .setAttr("alt", "Wishlist")
                .appendTo(actionDiv.element);

            productContainer
                .append(imageDiv.element)
                .append(nameDiv.element)
                .append(priceDiv.element)
                .append(actionDiv.element)
                .appendTo(productListContainer);
        });

        block.querySelectorAll(".dot").forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
    }

    // The decorate function that enables method chaining
    function decorate(element) {
        return {
            element: element,
            addClass: function(className) {
                if (className) {
                    element.classList.add(className);
                }
                return this;
            },
            setText: function(text) {
                element.textContent = text;
                return this;
            },
            setAttr: function(name, value) {
                element.setAttribute(name, value);
                return this;
            },
            onClick: function(callback) {
                element.addEventListener("click", callback);
                return this;
            },
            append: function(child) {
                element.appendChild(child);
                return this;
            },
            appendTo: function(parent) {
                parent.appendChild(element);
                return this;
            }
        };
    }
})();