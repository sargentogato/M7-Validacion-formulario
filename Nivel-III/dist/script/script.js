const form = document.forms[0];
const search = form["search"];
const nameUser = form["name"];
const email = form["email"];
const password = form["password"];
const passwordRepeat = form["passwordValidation"];
const province = form["province"];

let searchCharacters = 0;
let nameCharacters = 0;
let emailCharacters = 0;
let passwordCharacters = 0;
let passwordRepeatCharacter = 0;
const numbersTocheck = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const emptyErrorMessage = "Este campo es obligatorio";
const searchErrorMessage = "Este campo debe tener más de 3 letras";
const nameErrorMessage = "El nombre deber tener mínimo 3 letras";
const nameErrorMessage2 = "Formato de nombre no valido";
const emailErrorMessage = "El correo no cumple con el formato";
const passwordErrorMessage = "El password debe tener al menos una letra mayúscula, un número y 8 carácteres";
const repeatPassErrorMessage = "El password no coincide";
const repeatPassErrorMessageEmpty = "Tiene que confirmar su password";
const provinceErrorMessage = "Tiene que seleccionar una pronvincia";

const regexName = /[^a-zA-Z_]/;
const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regPassword = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

form.addEventListener("submit", handlerEvent, true);
form.addEventListener("blur", handlerEvent, true);

function handlerEvent(formEvent) {
  formEvent.preventDefault();

  searchCharacters = search.value.length;
  nameCharacters = nameUser.value.length;
  emailCharacters = email.value.length;
  passwordCharacters = password.value.length;
  passwordRepeatCharacter = passwordRepeat.value.length;

  if (formEvent.type === "submit") checkSubmit();
  if (formEvent.type === "blur") checkBlur();
  if (formEvent.type === "blur") passwordHandler();
}

function checkBlur() {
  /* Search */
  if (searchCharacters >= 4) {
    errorDisplayer(search.id, "");
  }

  /* Nombre */
  if (nameCharacters >= 3) {
    errorDisplayer(nameUser.id, "");
  }

  /* Email */
  if (emailCharacters > 0 && checkEmail()) {
    errorDisplayer(email.id, "");
  }

  /* Password */
  if (passwordCharacters > 0 && checkPassword()) {
    errorDisplayer(password.id, "");
  }

  if (password.value === passwordRepeat.value) {
    errorDisplayer(passwordRepeat.id, "");
  }

  /* Search */
  if (searchCharacters === 0) {
    errorDisplayer(search.id, emptyErrorMessage);
  }

  if (searchCharacters > 0 && searchCharacters < 4) {
    errorDisplayer(search.id, searchErrorMessage);
  }

  /* Nombre */
  if (nameCharacters === 0) {
    errorDisplayer(nameUser.id, emptyErrorMessage);
  }

  if (nameCharacters > 0 && nameCharacters < 3) {
    errorDisplayer(nameUser.id, nameErrorMessage);
  }

  if (checkName()) {
    errorDisplayer(nameUser.id, nameErrorMessage2);
  }

  /* Email */
  if (emailCharacters === 0) {
    errorDisplayer(email.id, emptyErrorMessage);
  }

  if (emailCharacters > 0 && !checkEmail()) {
    errorDisplayer(email.id, emailErrorMessage);
  }

  /* Password */
  if (passwordCharacters === 0) {
    errorDisplayer(password.id, emptyErrorMessage);
  }

  if (passwordRepeatCharacter === 0) {
    errorDisplayer(passwordRepeat.id, repeatPassErrorMessageEmpty);
  }

  if (password.value !== passwordRepeat.value && passwordRepeat.value.length !== 0) {
    errorDisplayer(passwordRepeat.id, repeatPassErrorMessage);
  }

  /* Provincia */
  if (province.value === "") {
    errorDisplayer(province.id, provinceErrorMessage);
  }

  if (province.value !== "") {
    errorDisplayer(province.id, "");
  }
}

function checkSubmit() {
  checkBlur();
  if (!isError()) {
    printValidation();
  }
}

function passwordHandler() {
  if (passwordCharacters > 0 && !checkPassword()) {
    errorDisplayer(password.id, passwordErrorMessage);
  }
}

function checkName() {
  return regexName.test(nameUser.value);
}

function checkEmail() {
  return regexEmail.test(email.value);
}

function checkPassword() {
  return regPassword.test(password.value);
}

function errorDisplayer(inputWithError, message) {
  const error = inputWithError + "Error";
  const inputError = document.getElementById(`${error}`);
  inputError.textContent = message;
}

function isError() {
  const formErrors = document.getElementsByClassName("error");

  let errorForm = false;
  for (const iterator of formErrors) {
    if (iterator.textContent.length > 0) {
      errorForm = true;
    }
  }

  return errorForm;
}

function printValidation() {
  const modal = document.getElementById("modalBox");
  modal.innerHTML = "";
  modal.innerHTML = `<p><b>Búsqueda:</b>${search.value}</p>
  <p><b>Nombre:</b>${nameUser.value}</p>
  <p><b>Correo:</b>${email.value}</p>
  <p><b>Provincia:</b>${province.value}</b>`;

  showModal();
}

function showModal() {
  document.getElementById("modal").click();
  form.reset();
}
