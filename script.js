// ELEMENTS DECLARATION
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

// ADD PRODUCT
function getTotal() {

    // CALCULATE THE RESULT AND CONVERTING STRING TO NUMBERS
   let result = (+price.value + +taxes.value + +ads.value) - +discount.value;

    // Update the total element with the result
    total.textContent = result;

    }

// CREATE AN ARRAY DECLARED VARIABLES
let inputElements = [price, taxes, ads, discount];

// SET UP EVENT LISTINERS USING FOREACH
inputElements.forEach(function (element) {
    element.addEventListener('input', getTotal);
});