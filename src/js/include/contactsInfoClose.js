const contactsBtnClose = document.getElementById("contactsBtnClose");
const contactsInfoBlock = document.getElementById("contactsInfoBlock");

contactsBtnClose.addEventListener("click", () =>
  contactsInfoBlock.classList.add("close")
);
