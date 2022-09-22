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
    for (color of product.colors) { // looping through array
        const productColor = document.createElement("option");
        productColor.value = color;
        productColor.innerText = color;
        container.appendChild(productColor);
    };
}

