const searchOpen = document.getElementById("searchOpen");
const searchClose = document.getElementById("searchClose");
const searchForm = document.getElementById("searchForm");

searchOpen.addEventListener("click", () => {
  searchForm.classList.add("open");
});

searchClose.addEventListener("click", () => {
  searchForm.classList.remove("open");
});
