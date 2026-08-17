const API_URL = "http://localhost:5000/api/products";

const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

let products = [];

// Fetch products from backend
async function loadProducts() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        products = await response.json();

        displayProducts(products);

    } catch (error) {
        console.error(error);

        productContainer.innerHTML = `
            <p>Unable to load products. Please try again.</p>
        `;
    }
}

// Display products
function displayProducts(productList) {
    productContainer.innerHTML = "";

    if (productList.length === 0) {
        productContainer.innerHTML = "<p>No products found.</p>";
        return;
    }

    productList.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
    <img
        src="images/${product.image}"
        alt="${product.name}"
        class="product-image"
    >

    <h3>${product.name}</h3>

    <p>${product.category}</p>

    <strong>₹${product.price}</strong>

    <br><br>

    <button onclick="addToCart('${product.name}', ${product.price})">
        Add to Cart
    </button>
`; 

        productContainer.appendChild(card);
    });
}

// Search and category filter
function filterProducts() {

    const searchText = searchInput.value.toLowerCase();

    const selectedCategory = categoryFilter.value;

    const filteredProducts = products.filter(product => {

        const matchesSearch =
            product.name.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayProducts(filteredProducts);
}

// Add product to cart
function addToCart(name, price) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        name: name,
        price: price
    });

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert(`${name} added to cart!`);
}

searchInput.addEventListener(
    "input",
    filterProducts
);

categoryFilter.addEventListener(
    "change",
    filterProducts
);

// Load products
loadProducts(); 
