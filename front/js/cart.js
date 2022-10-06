// TODO: clear cart after order is sent ?

// Fetching data from API

const apiUrl = "http://localhost:3000/api/products";
let productsStored = JSON.parse(localStorage.getItem("products"));
let productsWithPrice = [];
console.log(productsStored);

function displayCart() {
    if (!(productsStored == null || productsStored.length == 0)) { // Check if productsStored exists
        for (let product of productsStored) {
            productId = product._id,
            productColor = product.color,
            productQuantity = product.quantity

            let container = document.getElementById("cart__items");
            let productDetails = document.createElement("article");
            productDetails.setAttribute("class", "cart__item");
            productDetails.dataset.id = productId; // Using dataset instead of .setAttribute ----
            productDetails.dataset.color = productColor;
            container.appendChild(productDetails);

            fetch(apiUrl + "/" + productId)
                .then((response) => response.json())
                .then((data) => {
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

                    // Updating total price
                    let productOnlyPriceQuantity = {
                        price: data.price,
                        quantity: product.quantity
                    };
                    productsWithPrice.push(productOnlyPriceQuantity);
                    console.log(productsWithPrice);

                    let sumPrice = productsWithPrice.reduce((accumulator, product) => {
                        return accumulator + (product.price * product.quantity);
                    }, 0);
                    const totalPrice = document.getElementById("totalPrice");
                    totalPrice.innerText = sumPrice;

                    // Updating total quantity
                    let sumQuantity = productsWithPrice.reduce((accumulator, product) => {
                        return accumulator + product.quantity;
                    }, 0);
                    const totalQuantity = document.getElementById("totalQuantity");
                    totalQuantity.innerText = sumQuantity;

                    // Deleting item when user clicks btn
                    const deleteBtn = productDetails.querySelector(".deleteItem"); // On parent not on document
                    deleteBtn.addEventListener("click", (event) => {
                        const index = productsStored.indexOf(product); // Stores index value of this specific product in localStorage

                        if (index > -1) { // Only splices if item is found in array
                            productsStored.splice(index, 1); // Removes the product from array, 2nd parameter means remove one item only
                            localStorage.setItem("products", JSON.stringify(productsStored)); // Updates localStorage with modified array
                            // event.target refers to this specific btn, deleteBtn. Used to retrieve data from parentElement
                            const itemContainer = event.target.parentElement.closest("article"); // First retrieve target first parent, then the "article" parent
                            itemContainer.remove(); // Delete the full article (product) from HTML
                            productsWithPrice.splice(index,1);
                            let sumPrice = productsWithPrice.reduce((accumulator, product) => {
                                return accumulator + (product.price * product.quantity);
                            }, 0);
                            const totalPrice = document.getElementById("totalPrice");
                            totalPrice.innerText = sumPrice;
        
                            // Updating total quantity
                            let sumQuantity = productsWithPrice.reduce((accumulator, product) => {
                                return accumulator + product.quantity;
                            }, 0);
                            const totalQuantity = document.getElementById("totalQuantity");
                            totalQuantity.innerText = sumQuantity;
                        };
                    });

                    // Updating quantity directly from cart
                    const itemQuantity = productDetails.querySelector(".itemQuantity"); // On parent not on document
                    itemQuantity.addEventListener("keydown", (event) => { // prevent typing in the quantity field
                        event.preventDefault();
                    });

                    itemQuantity.addEventListener("change", (event) => {
                        const newQuantity = parseInt(itemQuantity.value); // Converts into integer
                        console.log("Quantité: " + newQuantity);

                        const index = productsStored.indexOf(product);
                        console.log("Index: " + index);

                        const index2 = productsWithPrice.indexOf(productOnlyPriceQuantity);
                        console.log(productsWithPrice);

                        // TODO: wrong index on productsWithPrice
                        productsStored[index].quantity = newQuantity; // Updating quantity in object
                        localStorage.setItem("products", JSON.stringify(productsStored)); // Updating localStorage to store the quantity change
                        console.log(productsStored);
                        productsWithPrice[index].quantity = newQuantity;
                        let sumPrice = productsWithPrice.reduce((accumulator, product) => {
                            return accumulator + (product.price * product.quantity);
                        }, 0);
                        const totalPrice = document.getElementById("totalPrice");
                        totalPrice.innerText = sumPrice;
    
                        // Updating total quantity
                        let sumQuantity = productsWithPrice.reduce((accumulator, product) => {
                            return accumulator + product.quantity;
                        }, 0);
                        const totalQuantity = document.getElementById("totalQuantity");
                        totalQuantity.innerText = sumQuantity;
                    });
                });
        };

    } else {
        let container = document.querySelector(".cart");
        container.replaceChildren(); // to remove all children of the section
        let emptyCart = document.createElement("p");
        emptyCart.setAttribute("id", "empty__cart");
        emptyCart.innerText = "Votre panier est vide, rendez-vous sur la page d'accueil afin de choisir l'un de nos somptueux canapés !";
        emptyCart.style["text-align"] = "center";
        container.appendChild(emptyCart);
    };
};

displayCart();

// Form input checks and POST request to API

// Declaring all error functions

function displayErrorFirstName() {
    const containerError = document.getElementById("firstNameErrorMsg");
    containerError.innerText = "Le prénom entré n'est pas valide";
};
function displayErrorLastName() {
    const containerError = document.getElementById("lastNameErrorMsg");
    containerError.innerText = "Le nom renseigné n'est pas valide";
};
function displayErrorAddress() {
    const containerError = document.getElementById("addressErrorMsg");
    containerError.innerText = "L'adresse renseignée n'est pas valide";
};
function displayErrorCity() {
    const containerError = document.getElementById("cityErrorMsg");
    containerError.innerText = "La ville renseignée n'est pas valide";
};
function displayErrorEmail() {
    const containerError = document.getElementById("emailErrorMsg");
    containerError.innerText = "L'adresse email n'est pas valide";
};

// Declaring regex testing function

function testingForm(){
    // Storing each user input in a let
    let userFirstName = document.getElementById("firstName").value;
    let userLastName = document.getElementById("lastName").value;
    let userAddress = document.getElementById("address").value;
    let userCity = document.getElementById("city").value;
    let userEmail = document.getElementById("email").value;

    // Declaring regex for each input in order to test if they're valid or not
    let nameRegex = /^[A-Z][A-Za-z\é\è\ê\ë\ï\s-']+$/;
    let addressRegex = /^[A-Za-z0-9\é\è\ê\ë\ï\s-']+$/;
    let emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g; // RFC2822 standards

    // Testing each input field
    let firstNameValid = nameRegex.test(userFirstName);
    let lastNameValid = nameRegex.test(userLastName);
    let addressValid = addressRegex.test(userAddress);
    let cityValid = nameRegex.test(userCity);
    let emailValid = emailRegex.test(userEmail);

    console.log(lastNameValid);

    if (firstNameValid && lastNameValid && addressValid && cityValid && emailValid){
        // Storing user data inside a contact object
        let contact = {
            firstName: userFirstName,
            lastName: userLastName,
            address: userAddress,
            city: userCity,
            email: userEmail
        };

        console.log(contact);

        // Creating array to store products ID for each product of productsStored
        let products = productsStored.map((product) => product._id);
        console.log(products);

        let bodyData = {
            contact, 
            products
        };

        // Sending POST request to API
        fetch(apiUrl + "/order", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);

                // Storing in let the orderId response from API
                let orderId = data.orderId;
                console.log(orderId);

                // Redirecting user to confirmation page
                window.location.replace(`./confirmation.html?id=${orderId}`); // Using .replace() instead of .href() to prevent user going back to the cart page
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        
        
    } else {
        if(!firstNameValid){
            displayErrorFirstName();
        }
        if(!lastNameValid){
            displayErrorLastName();
        }
        if(!addressValid){
            displayErrorAddress();
        }
        if(!cityValid){
            displayErrorCity();
        }
        if(!emailValid){
            displayErrorEmail();
        }
    }
};

const orderBtn = document.getElementById("order");
orderBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Disable page refresh while clicking
    testingForm();
});