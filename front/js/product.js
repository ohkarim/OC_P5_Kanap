// Fetching data from API, for a specific product

const apiUrl = "http://localhost:3000/api/products";
let productAddress = new URLSearchParams(document.location.search); // stores current URL in a let
let productId = productAddress.get("id"); // stores product id in a let

// Elements selectors

let productTitleTop = document.querySelector("title");
let productTitle = document.getElementById("title");
let productImg = document.querySelector(".item__img");
let img = document.createElement("img");
productImg.appendChild(img);
let productPrice = document.getElementById("price");
let productDescription = document.getElementById("description");
let productColors = document.getElementById("colors");

// Fetching data from API, and rendering HTML

async function displayProduct() {
    await fetch(apiUrl + "/" + productId)
    .then((response) => response.json())
    .then((data) => {
        productTitleTop.innerHTML = data.name;
        productTitle.innerHTML = data.name;
        img.setAttribute("src", data.imageUrl);
        img.setAttribute("alt", data.altTxt);
        productPrice.innerHTML = data.price;
        productDescription.innerHTML = data.description;

        // Adding colors options
        for (let color of data.colors) { // looping through array
            let colorOption = document.createElement("option");
            colorOption.value = color;
            colorOption.innerText = color;
            productColors.appendChild(colorOption);
        };
    });
};

displayProduct();

// Adding product to cart

function addToCart() {
    // Grabbing data from color and quantity
    let quantity = parseInt(document.getElementById("quantity").value); // parseInt used to get the input value as an Integer and not a String
    // console.log(quantity);
    let selectedColor = document.getElementById("colors").value;
    // console.log(selectedColor);

    if(quantity > 0 && quantity <= 101 && selectedColor != "") { // checks if user selected a color and a valid quantity
        let newProduct = {
            _id: productId,
            color: selectedColor,
            quantity: quantity
        };
        // Checks if products are stored in localStorage, if not an empty array is created
        let productsStored = JSON.parse(localStorage.getItem("products")) || [];
    
        // Finds existing products of both identical id and color
        let product = productsStored.find(product => product._id === newProduct._id && product.color === newProduct.color); 
        
        // Avoid duplicates of same product, with identical id and color. If a product is found, quantity is updated, if not, new product is pushed inside the array
        if (product) {
            if ((product.quantity + quantity) <= 100){
                product.quantity += quantity;
                if(confirm("Produit ajouté au panier. Souhaitez vous accéder au panier ?")){
                    window.location.href = "./cart.html";
                };
            } else {
                alert("Quantité maximale atteinte dans le panier pour un même produit")
            };
        } else {
            productsStored.push(newProduct);
            if(confirm("Produit ajouté au panier. Souhaitez vous accéder au panier ?")){
                window.location.href = "./cart.html";
            };
        };
    
        localStorage.setItem("products", JSON.stringify(productsStored));

    } else { // prompts user that he has to choose a valid color/quantity
        window.alert("Veuillez choisir une couleur ainsi qu'une quantité valides pour votre produit");
    };
};

const quantityField = document.getElementById("quantity");
quantityField.addEventListener("keydown", (event) => { // prevent typing in the quantity field
    event.preventDefault();
});

const addToCartBtn = document.getElementById("addToCart");
addToCartBtn.addEventListener("click", addToCart);
