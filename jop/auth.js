// حفظ حساب جديد (تسجيل)
function register(event) {
  event.preventDefault();

  const name = document.querySelector("#name")?.value;
  const email = document.querySelector("#email")?.value;
  const password = document.querySelector("#password")?.value;

  localStorage.setItem("userEmail", email);
  localStorage.setItem("userPassword", password);

  alert("تم إنشاء الحساب بنجاح ");
  window.location.href = "login.html";
}

function login(event) {
  event.preventDefault();

  const email = document.querySelector("#loginEmail").value;
  const password = document.querySelector("#loginPassword").value;

  const savedEmail = localStorage.getItem("userEmail");
  const savedPassword = localStorage.getItem("userPassword");

  if (email === savedEmail && password === savedPassword) {
    alert("تم تسجيل الدخول بنجاح ");
    window.location.href = "index.html";
  } else {
    alert("خطأ في البيانات ");
  }
}

function forgotPassword(event) {
  event.preventDefault();

  const email = document.querySelector("#forgotEmail").value;
  const savedEmail = localStorage.getItem("userEmail");

  if (email === savedEmail) {
    alert("تم إرسال رابط إعادة تعيين (تجريبي) ");
  } else {
    alert("الإيميل غير مسجل ");
  }
}