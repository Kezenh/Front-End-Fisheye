const main = document.getElementById("main");
const header = document.getElementById("header");
const modal = document.getElementById("contact_modal");
const regexName = /^[a-zA-Z ,'.-]{2,}$/;
const regexEmail = /^[0-9a-zA-Z-._]{1,64}@[a-zA-Z0-9]{1,64}.[a-z]{1,64}$/;
const send = document.getElementById("send");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const message = document.getElementById("message");
const firstError = document.getElementById("firstError");
const lastError = document.getElementById("lastError");
const emailError = document.getElementById("emailError");

send.addEventListener("click", sendContact);
firstName.addEventListener("input", firstReset);
lastName.addEventListener("input", lastReset);
email.addEventListener("input", emailReset);

function firstReset() {
    firstError.innerText = "";
    firstError.setAttribute("role", "");
}

function lastReset() {
    lastError.innerText = "";
    lastError.setAttribute("role", "");
}

function emailReset() {
    emailError.innerText = "";
    emailError.setAttribute("role", "");
}

function sendContact() {
    let check = true;
    if (!(regexName.test(firstName.value))) {
        check = false;
        firstError.innerText = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
        firstError.setAttribute("role", "alert");
    }
    if (!(regexName.test(lastName.value))) {
        check = false;
        lastError.innerText = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
        lastError.setAttribute("role", "alert");
    }
    if (!(regexEmail.test(email.value))) {
        check = false;
        emailError.innerText = "Vous devez entrer un email valide.";
        emailError.setAttribute("role", "alert");
    }
    if (check) {
        console.log("Prénom : " + firstName.value);
        console.log("Nom : " + lastName.value);
        console.log("Email : " + email.value);
        console.log("Message : " + message.value);
        closeModal();
    }
}

function displayModal() {
    main.setAttribute("aria-hidden", "true");
    header.setAttribute("aria-hidden", "true");
	modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
    main.setAttribute("aria-hidden", "false");
    header.setAttribute("aria-hidden", "false");
}