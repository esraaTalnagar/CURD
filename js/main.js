var productName = document.getElementById("ProductName");
var productPrice = document.getElementById("ProductPrice");
var productType = document.getElementById("ProductType");
var productDesc = document.getElementById("ProductDescription");
var addBtn = document.getElementById("Add");
var updateBtn = document.getElementById("Update");
var tableBody = document.getElementById("tableBody");
var deleteProduct = document.getElementById("delete");
var searchInput = document.getElementById("searchInput");
var toastBox = document.getElementById("toastBox");
var toastMessage = document.getElementById("toastMessage");

var productList =[];
if (localStorage.getItem("products") != null) {
  productList = JSON.parse(localStorage.getItem("products"));
  display();
}


addBtn.addEventListener('click', function addProduct(){
    if (!validation()) {
      return;
    }
    if (productName.value == "" || productPrice.value == "" || productType.value == "" || productDesc.value == "") {
        showToast("All Fields Are Required!", "warning");
        return;
    }
    var product = {
        name: productName.value,
        price: productPrice.value,
        type: productType.value,
        desc: productDesc.value,
    };
    productList.push(product);
    localStorage.setItem("products", JSON.stringify(productList));
    clearForm();
    display();
    showToast("Good Job! Product Added Successfully", "success");
});
;

function clearForm(){
    productName.value = '';
    productPrice.value = '';
    productType.value = '';
    productDesc.value = '';
}

function display(){
    var container = '';
    for (var i =0; i< productList.length; i++){
        container += `<tr data-index="${i}">
                        <th scope="row">${i + 1}</th>
                        <td>${productList[i].name}</td>
                        <td>${productList[i].price}</td>
                        <td>${productList[i].type}</td>
                        <td>${productList[i].desc}</td>
                        <td>
                        <button class="btn btn-danger">Delete</button>
                        <button class="btn btn-warning">Edit</button>
                        </td>
                    </tr>`;
    }
    tableBody.innerHTML = container;
}

deleteProduct = function(index) {
  productList.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(productList));
  display();
  clearForm();
  showToast("Product Removed!", "danger");
};

function search(){
    
    var searchValue = searchInput.value.toLowerCase();
    var container = '';
    var term = '';
    for(var i =0; i<productList.length; i++){
        term = (productList[i].name+productList[i].type+productList[i].desc).toLowerCase();
        if (term.includes(searchValue)) {
            container += `<tr data-index="${i}">
            <th scope="row">${i + 1}</th>
            <td>${productList[i].name}</td>
            <td>${productList[i].price}</td>
            <td>${productList[i].type}</td>
            <td>${productList[i].desc}</td>
            <td>
            <button class="btn btn-danger">Delete</button>
            <button class="btn btn-warning">Edit</button>
            </td>
        </tr>`;
}
        }
        tableBody.innerHTML = container;
    }

    var currentIndex;
editProduct = function(index){
    productName.value = productList[index].name;
    productPrice.value = productList[index].price;
    productType.value = productList[index].type;
    productDesc.value = productList[index].desc;
    addBtn.parentElement.classList.replace("d-flex","d-none");
    updateBtn.parentElement.classList.replace("d-none","d-flex");
    currentIndex = index;
}

updateBtn.addEventListener('click', function(){
    if (!validation()) {
      return;
    }
    if (
      productName.value == "" ||
      productPrice.value == "" ||
      productType.value == "" ||
      productDesc.value == ""
    ) {
      showToast("All Fields Are Required!", "warning");
      return;
    }
    var product = {
        name: productName.value,
        price: productPrice.value,
        type: productType.value,
        desc: productDesc.value,
    };
    productList[currentIndex] = product;
    localStorage.setItem("products", JSON.stringify(productList));
    display();
    clearForm();
    addBtn.parentElement.classList.replace("d-none","d-flex");
    updateBtn.parentElement.classList.replace("d-flex","d-none");
}) ;

tableBody.addEventListener('click', function(e){
    if (e.target.classList.contains("btn-danger")) {
        var index = e.target.closest("tr").dataset.index;
        deleteProduct(index);
    } else if (e.target.classList.contains("btn-warning")) {
        var index = e.target.closest("tr").dataset.index;
        editProduct(index);
    }
});

function showToast(message, color) {
    toastMessage.textContent = message;
    toastBox.className = `toast  bg-${color} position-fixed top-0 start-50 translate-middle-x align-items-center z-3`;
    var bell = document.querySelector(".bell-animation");
    bell.classList.remove("bell-animation");
    void bell.offsetWidth;
    bell.classList.add("bell-animation");
    var toast = new bootstrap.Toast(toastBox);
    toast.show();
}

function validation() {
  // استرجاع القيم من الحقول
  var name = productName.value.trim();
  var price = parseFloat(productPrice.value.trim());
  var type = productType.value.trim();
  var desc = productDesc.value.trim();

  // تحديد عناصر رسائل الخطأ
  var nameError = document.getElementById("nameError");
  var priceError = document.getElementById("priceError");
  var typeError = document.getElementById("typeError");
  var descError = document.getElementById("descError");

  nameError.classList.add("d-none");
  priceError.classList.add("d-none");
  typeError.classList.add("d-none");
  descError.classList.add("d-none");

  var isValid = true;

  if (!/^[A-Z][a-zA-Z]{3,7}$/.test(name)) {
    nameError.classList.remove("d-none");
    isValid = false;
  }

  if (isNaN(price) || price < 1000 || price > 10000) {
    priceError.classList.remove("d-none");
    isValid = false;
  }

  if (!/^(Mobile|Screen|Watch)$/.test(type)) {
    typeError.classList.remove("d-none");
    isValid = false;
  }

  if (desc.length < 5 || desc.length > 1000) {
    descError.classList.remove("d-none");
    isValid = false;
  }

  return isValid;
}

