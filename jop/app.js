// ========================
// 🟢 ADD TO CART
// ========================
function addToCart(name, price) {

  let user = localStorage.getItem("currentUser");

  if (!user) {
    alert("لازم تسجل دخول أولاً 🔐");
    return;
  }

  let cartKey = "cart_" + user;

  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));

  alert("تمت الإضافة للسلة 🛒");
}

// ========================
// 🟢 LOAD CART
// ========================
function loadCart() {

  let user = localStorage.getItem("currentUser");

  let cartKey = "cart_" + user;

  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  let container = document.getElementById("cartItems");

  if (!container) return;

  let total = 0;

  container.innerHTML = "";

  cart.forEach((item, index) => {

    total += item.price * item.qty;

    container.innerHTML += `
      <div class="item">
        <p>${item.name}</p>
        <span>${item.price} × ${item.qty} = ${item.price * item.qty} ريال</span>

        <button onclick="removeItem(${index})">حذف</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = total + " ريال";
}


// ========================
// 🟢 REMOVE ITEM
// ========================
function removeItem(index) {

  let user = localStorage.getItem("currentUser");

  let cartKey = "cart_" + user;

  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  cart.splice(index, 1);

  localStorage.setItem(cartKey, JSON.stringify(cart));

  loadCart();
}


// ========================
// 🟢 CHECKOUT
// ========================
function checkout() {

  let user = localStorage.getItem("currentUser");

  if (!user) {
    alert("لازم تسجل دخول أولاً 🔐");
    return;
  }

  let cartKey = "cart_" + user;

  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  if (cart.length === 0) {
    alert("السلة فاضية 🛒");
    return;
  }

  window.location.href = "payment.html";
}


// ========================
// 🟢 PAY
// ========================
function pay(e) {
  e.preventDefault();

  let user = localStorage.getItem("currentUser");

  let cartKey = "cart_" + user;

  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  if (cart.length === 0) {
    alert("السلة فاضية 🛒");
    return;
  }

  let orderId = "ORD-" + Date.now();

  let ordersKey = "orders_" + user;

  let orders = JSON.parse(localStorage.getItem(ordersKey)) || [];

  let total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  orders.push({
    orderId,
    items: cart,
    total,
    date: new Date().toLocaleString()
  });

  localStorage.setItem(ordersKey, JSON.stringify(orders));

  localStorage.removeItem(cartKey);

  localStorage.setItem("lastOrderId", orderId);

  alert("تم الدفع بنجاح ✅");

  window.location.href = "success.html";
}

function loadOrders() {

  let user = localStorage.getItem("currentUser");

  let orders = JSON.parse(localStorage.getItem("orders_" + user)) || [];

  let container = document.getElementById("orders");

  if (!container) return;

  container.innerHTML = "";

  orders.forEach(order => {

    container.innerHTML += `
      <div class="order">
        <h4>${order.orderId}</h4>
        <p>المبلغ: ${order.total} ريال</p>
        <p>التاريخ: ${order.date}</p>
      </div>
    `;
  });
}
// ========================
// 🟢 SHOW ORDER (SUCCESS PAGE)
// ========================
function showOrder() {

  let orderId = localStorage.getItem("lastOrderId");
  let total = localStorage.getItem("total");

  if (!orderId) {
    window.location.href = "index.html";
    return;
  }

  document.getElementById("orderId").innerText = orderId;
  let totalEl = document.getElementById("total");
if (totalEl) {
  totalEl.innerText = total + " ريال";
}
}
function register(username, password) {

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let exists = users.find(u => u.username === username);

  if (exists) {
    alert("اسم المستخدم موجود بالفعل ❌");
    return;
  }

  users.push({
    username: username,
    password: password
  });

  localStorage.setItem("users", JSON.stringify(users));

  alert("تم التسجيل بنجاح ✅");
  window.location.href = "login.html";
}
function login(username, password) {

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    alert("بيانات الدخول غلط ❌");
    return;
  }

  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("currentUser", username);

  alert("تم تسجيل الدخول ✅");

  window.location.href = "index.html";
}
function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("currentUser");

  alert("تم تسجيل الخروج");

  window.location.href = "login.html";
}
function loadProfile() {

  let user = localStorage.getItem("currentUser");

  if (!user) {
    alert("لازم تسجل دخول أولاً 🔐");
    window.location.href = "login.html";
    return;
  }

  document.getElementById("username").innerText = user;

  let orders = JSON.parse(localStorage.getItem("orders_" + user)) || [];

  document.getElementById("ordersCount").innerText = orders.length;

  let totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

  document.getElementById("totalSpent").innerText = totalSpent + " ريال";
}