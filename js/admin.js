// =====================================
// VERTICAL TECHNOLOGY ADMIN SYSTEM
// =====================================

import {
auth,
db,
storage
} from './firebase.js';

import {

signInWithEmailAndPassword,
onAuthStateChanged,
signOut

} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {

collection,
addDoc,
getDocs,
deleteDoc,
doc

} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {

ref,
uploadBytes,
getDownloadURL

} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// =====================================
// LOGIN ADMIN
// =====================================

window.loginAdmin = async function(){

const email =
document.getElementById("adminEmail").value;

const password =
document.getElementById("adminPassword").value;

try{

await signInWithEmailAndPassword(
auth,
email,
password
);

alert("Bienvenido Administrador");

document.getElementById("loginSection")
.style.display="none";

document.getElementById("dashboardSection")
.style.display="block";

loadProducts();

}catch(error){

alert(error.message);

}

};

// =====================================
// AUTH STATE
// =====================================

onAuthStateChanged(auth,(user)=>{

if(user){

document.getElementById("loginSection")
.style.display="none";

document.getElementById("dashboardSection")
.style.display="block";

loadProducts();

}else{

document.getElementById("loginSection")
.style.display="block";

document.getElementById("dashboardSection")
.style.display="none";

}

});

// =====================================
// LOGOUT
// =====================================

window.logoutAdmin = async function(){

await signOut(auth);

alert("Sesión cerrada");

};

// =====================================
// ADD PRODUCT
// =====================================

window.addProduct = async function(){

const name =
document.getElementById("productName").value;

const price =
document.getElementById("productPrice").value;

const description =
document.getElementById("productDescription").value;

const imageFile =
document.getElementById("productImage").files[0];

if(!imageFile){

alert("Selecciona una imagen");

return;

}

try{

// STORAGE

const storageRef = ref(
storage,
`products/${Date.now()}_${imageFile.name}`
);

await uploadBytes(storageRef,imageFile);

const imageUrl =
await getDownloadURL(storageRef);

// FIRESTORE

await addDoc(collection(db,"products"),{

name,
price,
description,
imageUrl,
createdAt:new Date()

});

alert("Producto agregado");

loadProducts();

}catch(error){

alert(error.message);

}

};

// =====================================
// LOAD PRODUCTS
// =====================================

async function loadProducts(){

const productsContainer =
document.getElementById("productsList");

if(!productsContainer) return;

productsContainer.innerHTML="";

const querySnapshot =
await getDocs(collection(db,"products"));

querySnapshot.forEach((docItem)=>{

const product = docItem.data();

productsContainer.innerHTML += `

<div class="admin-product">

<img src="${product.imageUrl}" width="100%">

<h3>${product.name}</h3>

<p>${product.description}</p>

<h2>$${product.price} MXN</h2>

<button onclick="deleteProduct('${docItem.id}')">
Eliminar
</button>

</div>

`;

});

}

// =====================================
// DELETE PRODUCT
// =====================================

window.deleteProduct = async function(id){

await deleteDoc(doc(db,"products",id));

alert("Producto eliminado");

loadProducts();

};
