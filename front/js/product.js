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
    // const _id = product._id;
    // const name = product.name;
    // const colors = product.colors;
    // const price = product.price;
    // const altTxt = product.altTxt;
    // const description = product.description;
    // const imageUrl = product.imageUrl;
    const { _id, name, colors, price, altTxt, description, imageUrl } = product; // Object destructuring
    displayImg(imageUrl, altTxt);
    displayName(name);
    displayPrice(price);
    displayDescription(description);
    displayColors(colors);
}

function displayImg(imageUrl, altTxt) {
    const productImage = document.createElement("img");
    productImage.src = imageUrl;
    productImage.alt = altTxt;
    const container = document.querySelector(".item__img");
    container.appendChild(productImage);
}

function displayName(name) {
    const productName = document.getElementById("title");
    productName.innerText = name;
}

function displayPrice(price) {
    const productPrice = document.getElementById("price");
    productPrice.innerText = price;
}

function displayDescription(description) {
    const productDescription = document.getElementById("description");
    productDescription.innerText = description;
}

function displayColors(colors) {
    const container = document.getElementById("colors");
    for (color of colors) {
        const productColor = document.createElement("option");
        productColor.value = color;
        productColor.innerText = color;
        container.appendChild(productColor);
    }
}


// const displaySingleProduct = function() {
//     fetch(apiUrl + "/" + productId)
//         .then((response) => response.json())
//         .then((data) => {
//             console.log(data);
//             let singleProductObject = data;

//             console.log(singleProductObject.altTxt);
//             console.log(singleProductObject.colors);

//             document.querySelector(".item__img").innerHTML = `<img src="${singleProductObject.imageUrl}" alt="${singleProductObject.altTxt}"></img>`;
//             document.getElementById("title").innerText = singleProductObject.name; // innerText instead of innerHTML because no HTML here
//             document.getElementById("price").innerText = singleProductObject.price;
//             document.getElementById("description").innerText = singleProductObject.description;
//             document.getElementById("colors").innerHTML += singleProductObject.colors.map((color) => 
//                 `<option value="${color}">${color}</option>`
//             ).join(""); //TODO: faire un for for, et pour chaque couleur faire un createElement pour chaque couleur donc MIXER
//             // for (color of singleProductObject.colors) { // itérer simplement un array
//             //     console.log(color);
//             //     document.getElementById("colors").innerHTML += `<option value="${color}">${color}</option>`; //+= permet d'ajouter les x itérations correspondantes aux couleurs
//             // };
//             //innerHTML dans un boucle = merdique
//         })
// };

// displaySingleProduct();

