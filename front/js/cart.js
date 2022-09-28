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
        productDetails.setAttribute("class", "cart__item"); // check dataset api
        productDetails.setAttribute("data-id", productId);
        productDetails.setAttribute("data-color", productColor);
        container.appendChild(productDetails);
    
        fetch(apiUrl + "/" + productId)
            .then((response) => response.json())
            .then((data) => productsData(data, product, productDetails)); 
        
        // TODO: update quantity in local storage, and get "Supprimer" btn working
        
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
    
    const deleteBtn = productDetails.querySelector(".deleteItem"); // on parent not on document
    deleteBtn.addEventListener("click", removeItem); // check with event.target

    function removeItem(event) { // must remove on both localStorage and HTML
        const index = productsStored.indexOf(product); // stores index value of this specific product in localStorage
        console.log(index);
        if (index > -1) { // only splices if item is found in array
            productsStored.splice(index, 1); // removes the product from array, 2nd parameter means remove one item only
            localStorage.setItem("products", JSON.stringify(productsStored)); // updates localStorage with modified array
        }
        console.log(productsStored);

        // event.target refers to this specific btn, deleteBtn. Used to retrieve data from parentElement
    const itemContainer = event.target.parentElement.closest("article"); // first retrieve target first parent, then the "article" parent
        itemContainer.remove(); // delete the full article (product) from HTML
    };
};

displayCart(productsStored);