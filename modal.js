function editNav() {
    var x = document.getElementById("myTopnav");
    const icon = document.getElementsByClassName("icon");
  
    if (x.className === "topnav") {
      x.className += " responsive";
      icon[0].style.color = "white";
    } else {
      x.className = "topnav";
      icon[0].style.color = "#ff0000";
    }
  
  }
  // DOM Elements
  const modalbg = document.querySelector(".bground");
  const modalBtn = document.querySelectorAll(".modal-btn");
  const formData = document.querySelectorAll(".formData");
  const modalCross = document.getElementsByClassName(".close");
  
  // launch modal event
  modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
  
  // launch modal form
  function launchModal() {
    modalbg.style.display = "block";
  }
  function closeModal() {
    modalbg.style.display = "none";
  };
  
  
  
  const form = document.getElementById ('form');
  const firstName = document.getElementById ('first');
  const lastName = document.getElementById ('last');
  const eMail = document.getElementById ('email');
  const birthDate = document.getElementById ('birthdate');
  
  const numbers = /^[0-9]+$/;

  const errorFirst = document.getElementById ('error-first');
  const errorLast = document.getElementById ('error-last');
  const errorMail = document.getElementById ('error-mail');
  const errorBirth = document.getElementById ('error-birth');
  const errorQuantity = document.getElementById ('error-quantity');
  const errorCity = document.getElementById ('error-city');
  const errorValidation = document.getElementById ('error-validation');
  
  const confirmation = document.getElementById ('confirmation');
  const confirmationCloseBtn = document.getElementsByClassName('btn-close');
  
  const FormData = document.getElementsByClassName('formData');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  })
  
  function validate () {
    let firstChecked = false;
    let lastChecked = false;
    let mailChecked = false;
    let birthChecked = false;
  
    const parentFirstName = firstName.parentNode;
    if (!firstName.value.match(/(.*[a-z]){2}/i) || firstName.value === ' ' || firstName.value === null || firstName.value.length < 2) {
      parentFirstName.setAttribute("data-error", 'Please fill in your First Name');
      parentFirstName.setAttribute("data-error-visible", "true");
      } else {
      parentFirstName.setAttribute("data-error-visible", "false");
      firstChecked = true;
    };
  
    const parentLastName = lastName.parentNode;
    if (!lastName.value.match(/(.*[a-z]){2}/i) || lastName.value === ' ' || lastName.value === null || lastName.value.length < 2) { 
      parentLastName.setAttribute("data-error", 'Please fill in your Last Name');
      parentLastName.setAttribute("data-error-visible", "true");
      } else {
      parentLastName.setAttribute("data-error-visible", "false");
      lastChecked = true;
    };
  
    const parentEmail = eMail.parentNode;
      if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/ .test(eMail.value)) { 
        parentEmail.setAttribute("data-error", 'Please fill in your eMail');
        parentEmail.setAttribute("data-error-visible", "true");
        } else {
        parentEmail.setAttribute("data-error-visible", "false");
      mailChecked = true;
    };
  
    const parent = birthDate.parentNode;
    if (!lastName.value.match(/(.*[a-z]){2}/i) || lastName.value === ' ' || lastName.value === null || lastName.value.length < 40){
      parent.setAttribute("data-error", 'Please fill in your date of birth');
      parent.setAttribute("data-error-visible", "true");
      } else {
      parent.setAttribute("data-error-visible", "false");
      birthChecked = true;      
      }  
  
    if (firstChecked && lastChecked && mailChecked && birthChecked) {
      form.style.display = "none";
      confirmation.style.display = "flex";
      form.reset()
    }
  
  
  }
  
  
  confirmationCloseBtn[0].addEventListener("click", () => {
    closeModal();
    form.style.display = "block";
    confirmation.style.display = "none";
  });