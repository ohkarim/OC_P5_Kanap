// Fetching data from API

const apiUrl = "http://localhost:3000/api/products";

fetch(apiUrl)
    .then((response) => response.json()) // promise: converts response into json
    .then((data) => {
        console.log(data);
        return displayProducts(data);
    });

// displaying products from api data, mapping through array of products to render all of them

function displayProducts(products) { // data renamed to products to describe what it contains
    document.getElementById("items").innerHTML = products.map((product) =>  /* HTML */ `
        <a href="./product.html?id=${product._id}">
            <article>
                <img src="${product.imageUrl}" alt="${product.altTxt}">
                <h3 class="productName">${product.name}</h3>
                <p class="productDescription">${product.description}</p>
            </article>
        </a>
    `).join(""); // get rid of commas between each product, converts array into string
};
