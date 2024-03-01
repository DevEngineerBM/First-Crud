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



// DECLARE VARIABLES TO TRACK WHETHER WE'RE UPDATING A PRODUCT AND WHICH PRODUCT WE'RE UPDATING
let isUpdating ;
let updatingIndex ;

// GET TOTAL
function getTotal() {
    // ENSURE THE INPUTS ARE NUMBERS, IF NOT,  WE SET THEM TO 0
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


let  nextId = 1;

function createProHelper(id) {
    return {
        id: id,
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.textContent,
        count: count.value,
        category: category.value,
    };
}

function createPro() {

    // CHECK THE FIELD ARE NOT EMPTY
    if (!title.value || !price.value || !taxes.value || !ads.value || !discount.value || !count.value || !category.value) {
        console.log('One or more fields are empty');
        alert('Please fill necessary fields');
        return;

    } 

    if (isUpdating) {

        // UPDATE THE EXISTING PRODUCT
        const updatedProduct = createProHelper(dataProduct[updatingIndex].id); // keep the same id
        dataProduct[updatingIndex] = updatedProduct;

        isUpdating = false;
        updatingIndex = null;
        submit.textContent = 'CREATE';

    } else {
        // ADD THE NEW PRODUCT
        if (count.value > 1) {
            for (let i = 0; i < count.value; i++ ) {
                const newProduct = createProHelper(nextId++); // assign the next ID and then increment it
                dataProduct.push(newProduct);
            }
        } else {
            const newProduct = createProHelper(nextId++); // assign the next ID and then increment it
            dataProduct.push(newProduct);
            count.style.display ='flex';
        }
    }

    // MAKE COUNT VISIBLE
    count.style.display ='flex';

    // SET the SUBMIT'S ORIGIN COLOR BACK
    submit.style.backgroundColor ='';

    // PUT NEW PRODUCT ON LOCALESTORAGE
    localStorage.setItem('product', JSON.stringify(dataProduct));

    // CALL CLEAR AND SHOW FUNCTIONS
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
    search.value = '';

}

submit.addEventListener('click', clearData);

//READ
function showData() {

    let tableBody = document.getElementById('tbody');

    tableBody.innerHTML = '';

    for (let i = 0; i < dataProduct.length; i++) {
        
        let row = tableBody.insertRow();
        row.id = 'product-' + dataProduct[i].id;
        
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

function updatePro(i) {

  // Assuming dataProduct[i] is an object with properties that match THE input elements
  let product = dataProduct[i];

  title.value = product.title;
  price.value = product.price;
  taxes.value = product.taxes;
  ads.value = product.ads;
  discount.value = product.discount;
  count.value = product.count;
  category.value = product.category;

// Hide the 'count' element
  count.style.display ='none';
  // STYLE UPDATE BUTTON
 submit.style.backgroundColor ='green';
  submit.textContent = 'UPDATE';
// SCROL TO TOP
  scroll({
    top : 0,
    behavior : "smooth",

});


// ACTIVATE UPDATE MODE INSIDE createPro() FUNCTION
isUpdating = true;
updatingIndex = i;


  // SHOW THE UPGRADED DATA 
  showData();
}


// SEARCH BY TITLE
const searchInput = document.getElementById('search')
const searchTitle = document.getElementById('search-title');

function searchByTitle(){

  let filter = search.value.toUpperCase();
  let tbody =document.getElementById('tbody')
  let tr = tbody.getElementsByTagName('tr');
let match = false;
    for (let i = 0; i < tr.length; i++) {

        let td = tr[i].getElementsByTagName('td')[1]; 

        if (td) {

            let txtValue = td.textContent || td.innerText;
  
            if (txtValue.toUpperCase().indexOf(filter) > -1) {

                tr[i].style.display = "";
                match = true;
            } else {

                tr[i].style.display = "none";

            }
        } 
        }

        if (!match) {
          alert('no such title in data')
          clearData()
        }
showData();
     } 


searchTitle.addEventListener('click', searchByTitle) 

// SEARCH BY CATEGORY
const searchCategory = document.getElementById('search-category');


function searchByCategory () {

  let filter = search.value.toUpperCase();

  let tbody =document.getElementById('tbody')
  let tr = tbody.getElementsByTagName('tr');
let match = false ;
    for (let i = 0; i < tr.length; i++) {

        let td = tr[i].getElementsByTagName('td')[8]; 

        if (td) {

            let txtValue = td.textContent || td.innerText;
  
            if (txtValue.toUpperCase().indexOf(filter) > -1) {

                tr[i].style.display = "";
                 match = true;
            } else {

                tr[i].style.display = "none";

            }
        }

     } 

     if (!match) {
      alert('no such category in data')
      clearData()
     }
showData();
}

searchCategory.addEventListener('click', searchByCategory)

// CALL showData FUNCTION ON PAGE LOAD
showData();















