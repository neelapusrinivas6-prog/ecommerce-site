let products = JSON.parse(localStorage.getItem("products")) || [
{ name:"Smartphone", price:14999, image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9", rating:4 },
{ name:"Laptop", price:55999, image:"https://images.unsplash.com/photo-1580910051074-3eb694886505", rating:5 },
{ name:"Headphones", price:1999, image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e", rating:4 },
{ name:"Shoes", price:2499, image:"https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb", rating:3 },
{ name:"Gaming Mouse", price:1299, image:"https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7", rating:4 },
{ name:"Smart Watch", price:3999, image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30", rating:5 },
{ name:"Bluetooth Speaker", price:2199, image:"https://images.unsplash.com/photo-1585386959984-a4155228b0c8", rating:4 },
{ name:"Backpack", price:1499, image:"https://images.unsplash.com/photo-1509762774605-f07235a08f1f", rating:3 },
{ name:"Sunglasses", price:899, image:"https://images.unsplash.com/photo-1572635196237-14b3f281503f", rating:4 },
{ name:"Keyboard", price:3499, image:"https://images.unsplash.com/photo-1593642634443-44adaa06623a", rating:5 },
{ name:"Monitor", price:12999, image:"https://images.unsplash.com/photo-1587829741301-dc798b83add3", rating:4 },
{ name:"Tablet", price:19999, image:"https://images.unsplash.com/photo-1542751371-adc38448a05e", rating:5 }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

function loadProducts(){
let container=document.getElementById("product-container");
if(!container) return;

container.innerHTML="";
products.forEach((p,index)=>{
let stars="⭐".repeat(p.rating);

container.innerHTML+=`
<div class="product fade">
<img src="${p.image}">
<h3>${p.name}</h3>
<p>${stars}</p>
<p>₹${p.price}</p>
<button onclick="addToCart(${index})">Add to Cart</button>
<button onclick="addToWishlist(${index})">❤️</button>
</div>
`;
});
updateCartCount();
}

function addToCart(index){
let item=cart.find(c=>c.name===products[index].name);
if(item){ item.qty++; }
else{ cart.push({...products[index], qty:1}); }

localStorage.setItem("cart",JSON.stringify(cart));
updateCartCount();
alert("Added to cart!");
}

function addToWishlist(index){
wishlist.push(products[index]);
localStorage.setItem("wishlist",JSON.stringify(wishlist));
alert("Added to Wishlist ❤️");
}
function toggleDark(){
    document.body.classList.toggle("dark");
}

function updateCartCount(){
let total=cart.reduce((sum,i)=>sum+i.qty,0);
let el=document.getElementById("cart-count");
if(el) el.innerText=total;
}

function placeOrder(){
orders.push(...cart);
localStorage.setItem("orders",JSON.stringify(orders));
cart=[];
localStorage.setItem("cart",JSON.stringify(cart));
alert("Order Placed Successfully 🎉");
window.location="orders.html";
}

function loadOrders(){
let container=document.getElementById("order-container");
if(!container) return;
container.innerHTML="";
orders.forEach(o=>{
container.innerHTML+=`
<div class="cart-item">
<h3>${o.name}</h3>
<p>₹${o.price}</p>
</div>
`;
});
}

function logout(){
localStorage.removeItem("user");
alert("Logged out");
window.location="login.html";
}

updateCartCount();
function displayCart(){
let container=document.getElementById("cart-items");
if(!container) return;

container.innerHTML="";
let total=0;

cart.forEach((item,index)=>{
total+=item.price*item.qty;

container.innerHTML+=`
<div class="cart-item">
<h3>${item.name}</h3>
<p>₹${item.price}</p>
<p>
<button onclick="changeQty(${index},-1)">-</button>
${item.qty}
<button onclick="changeQty(${index},1)">+</button>
</p>
<button onclick="removeItem(${index})">Remove</button>
</div>
`;
});

document.getElementById("total-price").innerText="Total: ₹"+total;
}
function changeQty(index,amount){
cart[index].qty+=amount;
if(cart[index].qty<=0){
cart.splice(index,1);
}
localStorage.setItem("cart",JSON.stringify(cart));
displayCart();
updateCartCount();
}

function removeItem(index){
cart.splice(index,1);
localStorage.setItem("cart",JSON.stringify(cart));
displayCart();
updateCartCount();
}