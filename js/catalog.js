/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
state.cart = new Cart([]);


// On screen load, we call this method to put all of the product options
// (the things in the state.allProducts array) into the drop down list.
function populateForm() {

  //DONE: Add an <option> tag inside the form's select for each product
  const selectElement = document.getElementById('items');
  for (let i in state.allProducts) {
    let objOption = document.createElement('option');
    objOption.value = state.allProducts[i].name;
    objOption.textContent = state.allProducts[i].name;
    selectElement.appendChild(objOption);
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // DONE: Prevent the page from reloading
  event.preventDefault();
  // Do all the things ...
  addSelectedItemToCart();
  state.cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

// DONE: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // DONE: suss out the item picked from the select list
  let item = document.getElementById("items").value;
  let quantity = parseInt(document.getElementById("quantity").value);
  
  // DONE: get the quantity

  // DONE: using those, add one item to the Cart
  

  let selectedItem = new CartItem(item,quantity);
  state.cart.items.push(selectedItem)



}

// DONE: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() { 
  let itemCount = document.getElementById('itemCount');
  let sum = 0;
  for (let i in state.cart.items){
    sum += state.cart.items[i].quantity;
  }
  itemCount.innerText = `${sum}`
}
// DONE: As you add items into the cart, show them (item & quantity) in the cart preview div
let cartContents = document.getElementById('cartContents');

function updateCartPreview() {
  // DONE: Get the item and quantity from the form
  while (cartContents.firstChild) {
    cartContents.removeChild(cartContents.firstChild);
  }
  //for loops 
  let item;
  let quantity;

  for (let i in state.cart.items) {
    item = state.cart.items.at(i).product;
    quantity = state.cart.items.at(i).quantity;
    let previewDiv = document.createElement('div');
    previewDiv.innerText = `You have ${quantity}, ${item} in your cart.`;
    cartContents.appendChild(previewDiv);
  }
  // DONE: Add a new element to the cartContents div with that information
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
