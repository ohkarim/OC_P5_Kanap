// Fetching data from API

const apiUrl = "http://localhost:3000/api/products";
let productsStored = JSON.parse(localStorage.getItem("products"));
console.log(productsStored);



for (let product of productsStored){
    productId = product._id,
    productColor = product.color,
    productQuantity = product.quantity
    
    let container = document.getElementById("cart__items");
    let productDetails = document.createElement("article");
    productDetails.setAttribute("class", "cart__item");
    productDetails.setAttribute("data-id", productId);
    productDetails.setAttribute("color-id", productColor);
    container.appendChild(productDetails);

    fetch(apiUrl + "/" + productId)
        .then((response) => response.json())
        .then((data) => productsData(data));
    
    // TODO: update quantity in local storage, and get "Supprimer" btn working
    function productsData(data) {
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
    };
    
};