// Fetching data from API, for a specific product

const apiUrl = "http://localhost:3000/api/products";
let productAddress = new URLSearchParams(document.location.search); // stores current URL in a let
let productId = productAddress.get("id"); // stores product id in a let

console.log(productId);

// Data rendering

fetch(apiUrl + "/" + productId)
    .then((response) => response.json())
    .then((data) => productsData(data));

function productsData(product) {
    document.querySelector("title").innerText = product.name;
    document.querySelector(".item__img").innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}"></img>`;
    document.getElementById("title").innerText = product.name; // innerText instead of innerHTML because no HTML here
    document.getElementById("price").innerText = product.price;
    document.getElementById("description").innerText = product.description;

    const container = document.getElementById("colors")
    for (let color of product.colors) { // looping through array
        const productColor = document.createElement("option");
        productColor.value = color;
        productColor.innerText = color;
        container.appendChild(productColor);
    };
}

// addToCart feature, storing data to localStorage
// TODO: redirecting to cart.html once a product is added in the cart ? Pop up go to cart or not + max quantity 100 per order/per product, both here and in cart

const addToCartBtn = document.getElementById("addToCart");
addToCartBtn.addEventListener("click", addToCart);

function addToCart() {
    // Grabbing data from color and quantity
    let quantity = parseInt(document.getElementById("quantity").value); // parseInt used to get the input value as an Integer and not a String
    // console.log(quantity);
    let selectedColor = document.getElementById("colors").value;
    // console.log(selectedColor);

    if(quantity > 0 && selectedColor != "") { // checks if user selected a color and a valid quantity
        let newProduct = {
            _id: productId,
            color: selectedColor,
            quantity: quantity
        };
        // Checks if products are stored in localStorage, if not an empty array is created
        let productsStored = JSON.parse(localStorage.getItem("products")) || [];
    
        // Finds existing products of both identical id and color
        let product = productsStored.find(product => product._id === newProduct._id && product.color === newProduct.color); 
    
        // Avoid duplicates of same product, with identical id and color. If a product is found, quantity is update, if not, new product is pushed inside the array
        if (product) {
            product.quantity += quantity;
        } else {
            productsStored.push(newProduct);
        }
    
        localStorage.setItem("products", JSON.stringify(productsStored));
    } else { // prompts user that he has to choose a valid color/quantity
        window.alert("Veuillez choisir une couleur ainsi qu'une quantité pour votre produit");
    };
};