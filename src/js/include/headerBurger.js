const burgerBtn = document.getElementById("burgerBtn");
const burgerBtnClose = document.getElementById("burgerBtnClose");
const nav = document.getElementById("nav");

burgerBtn.addEventListener("click", () => {
  nav.classList.add("open");
});

burgerBtnClose.addEventListener("click", () => {
  nav.classList.remove("open");
});
