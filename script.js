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

// GET TOTAL

function getTotal() {
    // ENSURE THE INPUTS ARE NUMBERS, IF NOT, SET THEM TO 0
    let priceValue = parseFloat(price.value) || 0;
    let taxesValue = parseFloat(taxes.value) || 0;
    let adsValue = parseFloat(ads.value) || 0;
    let discountValue = parseFloat(discount.value) || 0;

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
let newProduct = {

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

        let deleteButton = createButton('Delete', () => deletePro(i));
        let updateButton = createButton('Update', () => updateRow(i));

        row.insertCell().appendChild(deleteButton);
        row.insertCell().appendChild(updateButton);
    }
     getTotal();
}

 function createButton(text, clickHandler) {
    let button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', clickHandler);
    return button;
}
   
 
//QUICK AND DIRTY showData LOL

/* function showData() {

   
    let tableHTML = '';

   array
    for (let i = 0; i < dataProduct.length; i++) {
       
        tableHTML += `<tr>
                          <td>${i}</td>
                          <td>${dataProduct[i].title}</td>
                          <td>${dataProduct[i].price}</td>
                          <td>${dataProduct[i].taxes}</td>
                          <td>${dataProduct[i].ads}</td>
                          <td>${dataProduct[i].discount}</td>
                          <td>${dataProduct[i].total}</td>
                          <td>${dataProduct[i].count}</td>
                          <td>${dataProduct[i].category}</td>
                          <td><button id="update">update</button></td>
                          <td><button id="delete">delete</button></td>
                      </tr>`;
    }

    document.getElementById('tbody').innerHTML = tableHTML;
}  */

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









// CALL showData FUNCTION ON PAGE LOAD
showData();















