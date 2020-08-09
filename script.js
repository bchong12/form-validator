const form = document.getElementById("form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const email = document.getElementById("email");
const password2 = document.getElementById("password2");

//Show Error function
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.textContent = message;
}

//Check for success function
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

//checkForBlankText function
function checkForBlankText(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() == "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

//Get field name
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Check for Length function
function checkForLength(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.length < 4) {
      showError(input, `${getFieldName(input)} must be at least 4 characters`);
    } else if (input.value.length > 15) {
      showError(
        input,
        `${getFieldName(input)} must be less than 15 characters`
      );
    } else {
      showSuccess(input);
    }
  });
}

//Check for valid email
function checkForEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

//passwordConfirmation
function passwordConfirmation(input1, input2) {
  if (input1.value === input2.value) {
    showSuccess(input2);
  } else {
    showError(input2, "Passwords do not match");
  }
}

//password must include function
function passwordIncludes(input) {
  const re = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Password must include one special character");
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkForBlankText([username, email, password]);
  checkForLength([username, password]);
  checkForEmail(email);
  passwordConfirmation(password, password2);
  passwordIncludes(password);
});
