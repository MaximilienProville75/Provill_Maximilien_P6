const modalCross = document.getElementsByClassName("close");
const modalBtn = document.querySelectorAll(".contactMeButton");
const modalbg = document.querySelector(".modalbg");

modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
function launchModal() {
  modalbg.style.display = "block";
}
function closeModal() {
  modalbg.style.display = "none";
}
modalCross[0].addEventListener("click", closeModal);

const form = document.getElementById("form");
const Surname = document.getElementById("Surname");
const FamilyName = document.getElementById("FamilyName");
const email = document.getElementById("email");
const CommentInput = document.getElementById("Comment");
const confirmation = document.getElementById("confirmation");
const confirmationCloseBtn = document.getElementsByClassName("btnClose");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInput();
});

function checkInput() {
  let surnameValue = Surname.value.trim();
  let familyNameValue = FamilyName.value.trim();
  let emailValue = email.value.trim();
  let commentValue = CommentInput.value.trim();

  let sur = false;
  let fam = false;
  let em = false;
  let com = false;

  if (
    !surnameValue.match(/(.*[a-z]){2}/i) ||
    surnameValue === " " ||
    surnameValue === null ||
    surnameValue.length < 2
  ) {
    setErrorFor(Surname, "Entrer un prénom valide");
  } else {
    setSuccessFor(Surname);
    sur = true;
  }

  if (
    !familyNameValue.match(/(.*[a-z]){2}/i) ||
    familyNameValue === " " ||
    familyNameValue === null ||
    familyNameValue.length < 2
  ) {
    setErrorFor(FamilyName, "Entrer un nom de famille valide");
  } else {
    setSuccessFor(FamilyName);
    fam = true;
  }

  if (
    !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
      emailValue
    )
  ) {
    setErrorFor(email, "Entrer une email valide");
  } else {
    setSuccessFor(email);
    em = true;
  }

  if (
    !commentValue.match(/(.*[a-z]){2}/i) ||
    commentValue === " " ||
    commentValue === null ||
    commentValue.length < 10
  ) {
    setErrorFor(CommentInput, "Entrer au moin dix characteres");
  } else {
    setSuccessFor(CommentInput);
    com = true;
  }

  if (sur && fam && em && com) {
    form.style.display = "none";
    confirmation.style.display = "flex";
    form.reset();
  }
}

confirmationCloseBtn[0].addEventListener("click", () => {
  closeModal();
  form.style.display = "block";
  confirmation.style.display = "none";
});

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  small.innerText = message;

  formControl.className = "form-control error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}
