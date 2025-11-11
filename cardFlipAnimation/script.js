const card = document.getElementById("card");
const numInput = document.getElementById("num");
const nameInput = document.getElementById("name");
const expInput = document.getElementById("exp");
const cvvInput = document.getElementById("cvv");
const dnum = document.getElementById("dnum");
const dname = document.getElementById("dname");
const dexp = document.getElementById("dexp");
const dcvv = document.getElementById("dcvv");

numInput.oninput = () =>
(dnum.textContent = numInput.value
    .replace(/\D/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim());

nameInput.oninput = () =>
    (dname.textContent = nameInput.value.toUpperCase() || "FULL NAME");

expInput.oninput = () =>
(dexp.textContent = expInput.value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d{1,2})/, "$1/$2"));

cvvInput.onfocus = () => card.classList.add("flip");
cvvInput.onblur = () => card.classList.remove("flip");

cvvInput.oninput = () =>
    (dcvv.textContent = cvvInput.value.replace(/./g, "*") || "***");



























