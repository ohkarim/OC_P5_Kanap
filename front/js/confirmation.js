// Grabing orderId from URL

let orderIdURL = new URLSearchParams(document.location.search); // stores current URL in a let
let orderId = orderIdURL.get("id");

console.log(orderId);

// Rendering orderId inside dedicated HTML element

let container = document.getElementById("orderId");
container.innerText = orderId;