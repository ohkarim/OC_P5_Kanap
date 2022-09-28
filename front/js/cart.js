// Fetching data from API

const apiUrl = "http://localhost:3000/api/products";
let productsStored = JSON.parse(localStorage.getItem("products"));
console.log(productsStored);

function displayCart(productsStored) {
    for (let product of productsStored){
        productId = product._id,
        productColor = product.color,
        productQuantity = product.quantity
        
        let container = document.getElementById("cart__items");
        let productDetails = document.createElement("article");
        productDetails.setAttribute("class", "cart__item");
        productDetails.dataset.id = productId; // Using dataset instead of .setAttribute ---- productDetails.setAttribute("data-id", productId); ----
        productDetails.dataset.color = productColor;
        container.appendChild(productDetails);
    
        fetch(apiUrl + "/" + productId)
            .then((response) => response.json())
            .then((data) => productsData(data, product, productDetails));  
    };  
};

function productsData(data, product, productDetails) {
    productDetails.innerHTML =  /* HTML */`
        <div class="cart__item__img">
            <img src="${data.imageUrl}" alt="${data.altTxt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
            <h2>${data.name}</h2>
            <p>${product.color}</p>
            <p>${data.price} €</p>
            </div>
            <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
                <p>Qté :</p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
            </div>
            </div>
        </div>
    `;
    
    // Delete a specific product from cart

    const deleteBtn = productDetails.querySelector(".deleteItem"); // On parent not on document
    deleteBtn.addEventListener("click", removeItem);

    function removeItem(event) { // Must remove on both localStorage and HTML
        const index = productsStored.indexOf(product); // Stores index value of this specific product in localStorage
        
        if (index > -1) { // Only splices if item is found in array
            productsStored.splice(index, 1); // Removes the product from array, 2nd parameter means remove one item only
            localStorage.setItem("products", JSON.stringify(productsStored)); // Updates localStorage with modified array
        };

        // event.target refers to this specific btn, deleteBtn. Used to retrieve data from parentElement
        const itemContainer = event.target.parentElement.closest("article"); // First retrieve target first parent, then the "article" parent
        itemContainer.remove(); // Delete the full article (product) from HTML
    };

    // Updating quantity

    const itemQuantity = productDetails.querySelector(".itemQuantity"); // On parent not on document
    itemQuantity.addEventListener("change", updateQuantity);

    function updateQuantity() {
        const newQuantity = parseInt(itemQuantity.value); // Converts into integer
        console.log("Quantité: " + newQuantity);

        const index = productsStored.indexOf(product);
        console.log("Index: " + index);

        productsStored[index].quantity = newQuantity; // Updating quantity in object
        localStorage.setItem("products", JSON.stringify(productsStored)); // Updating localStorage to store the quantity change
    };
};

displayCart(productsStored);