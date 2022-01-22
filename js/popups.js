// popups
const popupMap = document.querySelector(".popup--map"); //Map - popup
const popupWriteUs = document.querySelector(".popup--write-us"); //writeUs - popup
const popupAlert = document.querySelector(".popup--alert"); //Alert - popup
const mapBtn = document.querySelector(".map-btn"); // show map btn
const writeUsBtn = document.querySelector(".btn--ask-us"); // show writeus btn
const cartBtnsArray = document.querySelectorAll(".card__btn--cart"); // show card-buy menu btns

// last focused element
let lastFocus;

// show writeUs function
function showPopupWriteUs() {
  lastFocus = document.activeElement;
  popupWriteUs.classList.add("popup--show", "popup--bounce");
  const writeUsLogin = popupWriteUs.querySelector("#write-us__login"); // login-input
  const writeUsEmail = popupWriteUs.querySelector("#write-us__email"); // email-input
  const writeUsMessage = popupWriteUs.querySelector("#write-us__message"); // textarea-input
  const writeUsSubmitBtn = popupWriteUs.querySelector("#writeUs-submit"); // submit-button
  const writeUsForm = popupWriteUs.querySelector(".write-us"); // form

  // function that saves value-text in localStorage when input blurs
  function setToLocalStoreOnBlur(element) {
    element.addEventListener("blur", () => {
      if (element.value) {
        localStorage.setItem(element.id, element.value);
      }
    });
  }

  // function element-shaker
  function errorShaker(element) {
    element.classList.remove("popup--error", "popup--bounce");
    setTimeout(() => {
      element.classList.add("popup--error");
    }, 0);
  }

  // trying using localStorage for inputs. Keys named by input.id
  try {
    let storageLogin = localStorage.getItem(writeUsLogin.id);
    let storageEmail = localStorage.getItem(writeUsEmail.id);

    if (storageLogin) {
      writeUsLogin.value = storageLogin;
    }
    if (storageEmail) {
      writeUsEmail.value = storageEmail;
    }

    // chain of empty-test to focus input
    if (!storageLogin) {
      writeUsLogin.focus();
    } else if (!storageEmail) {
      writeUsEmail.focus();
    } else {
      writeUsMessage.focus();
    }

    setToLocalStoreOnBlur(writeUsLogin);
    setToLocalStoreOnBlur(writeUsEmail);
  } catch (err) {
    console.log("LocalStorage в данном браузере не работает");
  }

  // validating inputs
  // 1.when inputs are empty- exec errorShaker function that adds error-class to the element

  writeUsForm.addEventListener("submit", (evt) => {
    if (!writeUsEmail.value || !writeUsEmail.value || !writeUsMessage.value) {
      evt.preventDefault();
      errorShaker(popupWriteUs);
    }
    //
  });
  // 2.when inputs not valid & click submit - shake popup.
  writeUsSubmitBtn.addEventListener("click", () => {
    if (
      !writeUsLogin.validity.valid ||
      !writeUsEmail.validity.valid ||
      !writeUsMessage.validity.valid
    ) {
      errorShaker(popupWriteUs);
    }
  });
}

// show popups by click if they exists on page
// show map - popup
if (mapBtn) {
  mapBtn.addEventListener("click", () => {
    popupMap.classList.add("popup--show", "popup--bounce");
    lastFocus = document.activeElement;
    popupMap.querySelector(".popup__js-close").focus();
  });
}

// show writeUs - popup
if (writeUsBtn) {
  writeUsBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    showPopupWriteUs();
  });
}
// show alert (adding to cart) - popup
if (cartBtnsArray) {
  cartBtnsArray.forEach((el) => {
    el.addEventListener("click", () => {
      lastFocus = document.activeElement;
      popupAlert.classList.add("popup--show", "popup--bounce");
      popupAlert.querySelector("#alert-toCartBtn").focus();
    });
  });
}

// function close all popups
function closePopups() {
  if (popupMap) popupMap.classList.remove("popup--show", "popup--bounce");
  if (popupWriteUs)
    popupWriteUs.classList.remove(
      "popup--show",
      "popup--error",
      "popup--bounce"
    );
  if (popupAlert) popupAlert.classList.remove("popup--show", "popup--bounce");
  lastFocus.focus();
}
// close buttons - close all popups
document.querySelectorAll(".popup__js-close").forEach((el) => {
  el.addEventListener("click", () => {
    closePopups();
  });
});

// esc - close all popups
window.addEventListener("keydown", (evt) => {
  if (evt.keyCode == 27) {
    closePopups();
  }
});
