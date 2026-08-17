const API_URL = "http://localhost:5000/api/products";

// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

async function loadProduct() {
    try {
        const response = await fetch(`${API_URL}/${productId}`);

        if (!response.ok) {
            throw new Error("Product not found");
        }

        const product = await response.json();

        document.getElementById("productName").textContent = product.name;
        document.getElementById("productCategory").textContent = product.category;
        document.getElementById("productPrice").textContent = `₹${product.price}`;
        document.getElementById("productDescription").textContent = product.description;

        document.getElementById("addCartBtn").onclick = () => {
            addToCart(product.name, product.price);
        };

    } catch (error) {
        console.error(error);

        document.getElementById("productContainer").innerHTML =
            "<p>Unable to load product.</p>";
    }
}

function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        name: name,
        price: price
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${name} added to cart!`);
}

loadProduct(); 
