// ELEMENTS DECLARATION
const title = document.getElementById('title');
const price = document.getElementById('price');
const taxes = document.getElementById('taxes');
const ads = document.getElementById('ads');
const discount = document.getElementById('discount');
const total = document.getElementById('total');
const count = document.getElementById('count');
const category = document.getElementById('category');
const submit = document.getElementById('submit');

// GET TOTAL

function getTotal() {
    // ENSURE THE INPUTS ARE NUMBERS, IF NOT, SET THEM TO 0
    const priceValue = parseFloat(price.value) || 0;
    const taxesValue = parseFloat(taxes.value) || 0;
    const adsValue = parseFloat(ads.value) || 0;
    const discountValue = parseFloat(discount.value) || 0;

    // CALCULATE THE RESULT
    let result = (priceValue + taxesValue + adsValue) - discountValue;

    // UPDATE THE TOTAL ELEMENT WITH THE RESULT
    total.textContent = result;

    // SET THE BACKGROUND COLOR BASED ON THE RESUT
    if (result !== 0) {
        total.style.backgroundColor = '#040';
    } else {
        total.style.backgroundColor = ''; 
    }
}



// CREATE AN ARRAY DECLARED VARIABLES
let inputElements = [price, taxes, ads, discount];

// SET UP EVENT LISTINERS USING FOREACH
inputElements.forEach(function(element) {
    element.addEventListener('input', getTotal);
});

getTotal()


// CREATE PRODUCT 

let dataProduct;

//CHECK AND BRING LOCAL STORAGE DATA
if (localStorage.product) {

dataProduct = JSON.parse(localStorage.product)

} else {
    dataProduct = [];
}

function createPro() {

//CHECK THE FIELDS ARE NOT EMPTY

    if (!title.value || !price.value || !taxes.value || !ads.value || !discount.value || !count.value || !category.value) {
        console.log('One or more fields are empty');
        alert('Please fill necessary fields');
        return;
    } 
    


// CREATE OBJECTS
const newProduct = {

    title : title.value,
    price : price.value,
    taxes : taxes.value,
    ads : ads.value,
    discount : discount.value,
    total : total.textContent,
    count : count.value,
    category : category.value,
}
 
// PUSH NEW OBJECT TO DATA ARRAY

dataProduct.push(newProduct);

// PUT NEW PRODUCT ON LOCALSTORAGE
localStorage.setItem('product', JSON.stringify(dataProduct))

// CALL  CLEAR AND  SHOW  FUNCTION 
clearData();
showData();
}

submit.addEventListener('click', createPro)

// CLEAR INPUTS

function clearData() {

    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.textContent = '';
    count.value = '';
    category.value = '';

}

submit.addEventListener('click', clearData);


//READ
function showData() {

    let tableBody = document.getElementById('tbody');

    tableBody.innerHTML = '';

    for (let i = 0; i < dataProduct.length; i++) {
        let row = tableBody.insertRow();

        for (let key in dataProduct[i]) {
            if (dataProduct[i].hasOwnProperty(key)) {
                let cell = row.insertCell();
                cell.textContent = dataProduct[i][key];
            }
        }

        const deleteButton = createButton('Delete', () => deletePro(i));
        const updateButton = createButton('Update', () => updatePro(i));
       
        row.insertCell().appendChild(deleteButton);
        row.insertCell().appendChild(updateButton);
        
    }
     getTotal();
    
}

 function createButton(text, clickHandler) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', clickHandler);
    return button;
}

//DELETE PRODUCT

function deletePro(i) {

    // DELETE FROM ARRAY
   dataProduct.splice(i,1);

   //UPGRADE THE DATE
   localStorage.product = JSON.stringify(dataProduct);

   // SHOW THE UPGRADED DATA 
   showData();
}

// DELETE ALL PRODUCT 

     //  ELEMENT CREATION AND MANIPULATION
    const clearButton = document.createElement('button');
    const table = document.querySelector('table')
    clearButton.innerText = 'clear all';
    clearButton.className = 'clear-all'
    table.parentElement.insertBefore(clearButton, table);

function clearAll() {

      // CLEAR THE DATA
    dataProduct.length = 0;

      // Update the localStorage
    localStorage.product = JSON.stringify(dataProduct);

      // SHOW THE UPGRADED DATA 
    showData();
} 

clearButton.addEventListener('click', clearAll)

// UPDATE 

function updatePro() {

  let inputAllElements = [title, price, taxes, ads, discount, count, category];

    for (let i = 0; i < inputAllElements.length; i++) {
    inputElements[i].value = dataProduct[i];
}

  // SHOW THE UPGRADED DATA 
    showData();

}












// CALL showData FUNCTION ON PAGE LOAD
showData();















