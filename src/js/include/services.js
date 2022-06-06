let servicesBtns = document.querySelectorAll(".services-choose-btn");
let servicesBtnClassActive = "active";
let servicesListClassActive = "active";

servicesBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    servicesBtns.forEach((btn) => btn.classList.remove(servicesBtnClassActive));
    btn.classList.add(servicesBtnClassActive);

    let container = document.querySelector(".services-container");
    container.classList.remove("main");
    container.classList.remove("extra");
    container.classList.add(btn.dataset.id);
  });

  btn.addEventListener("mousedown", () => {
    document
      .querySelectorAll(".services-choose-btn")
      .forEach((list) => list.classList.remove(servicesBtnClassActive));
    btn.classList.add(servicesBtnClassActive);
  });
});
