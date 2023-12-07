import { createNotification } from "../components/notification.js"; 


const form = document.querySelector('#form');
const nameInput = document.querySelector('#name-input');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const matchInput = document.querySelector('#match-input');
const formBtn = document.querySelector('#form-btn');
const notification = document.querySelector('#notification');

// Regex validations
const EMAIL_VALIDATION = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PASSWORD_VALIDATION = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const NAME_VALIDATION = /^[A-Z\u00d1][a-zA-Z-ÿí[\u00f1\u00d1]+(\s*[A-Z\u00d1][a-zA-Z-ÿíó[\u00f1\u00d1]*)$/;

//Validations
let nameValidation = false;
let emailValidation = false;
let passwordValidation = false;
let matchValidation = false;

const validation = (input, regexValidation) => {
  formBtn.disabled = nameValidation && emailValidation && passwordValidation && matchValidation ? false : true;

  if(input.value === ''){
    input.classList.remove('border-red-600','border-2');
    input.classList.remove('border-green-600','border-2');
    input.classList.add('focus:border-indigo-900');
  } else if (regexValidation){
    input.classList.remove('focus:border-indigo-900');
    input.classList.add('border-green-600','border-2');
  } else if (!regexValidation) {
    input.classList.remove('focus:border-indigo-900');
    input.classList.remove('border-green-600','border-2');
    input.classList.add('border-red-600','border-2');
  }
};

//Events

nameInput.addEventListener('input', e => {
  nameValidation = NAME_VALIDATION.test(e.target.value);
  validation(nameInput, nameValidation );
});

emailInput.addEventListener('input', e => {
  emailValidation = EMAIL_VALIDATION.test(e.target.value);
  validation(emailInput, emailValidation );
});

passwordInput.addEventListener('input', e => {
  passwordValidation = PASSWORD_VALIDATION.test(e.target.value);
  matchValidation = e.target.value === matchInput.value;
  validation(passwordInput, passwordValidation );
  validation(matchInput, matchValidation );
});

matchInput.addEventListener('input', e => {
  matchValidation = e.target.value === passwordInput.value;
  validation(matchInput, matchValidation );
});

form.addEventListener('submit', async e => {
  e.preventDefault();

  try {
    const newUser = {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    };
    
    const { data } = await axios.post('/api/users' , newUser);
    
    createNotification(false, data);
    setTimeout(() => {
      notification.innerHTML= '';
    }, 5000)

    nameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    matchInput.value = '';
    validation(nameInput, false );
    validation(emailInput, false );
    validation(passwordInput, false );
    validation(matchInput, false );

  } catch (error) {
    createNotification(true, error.response.data.error);
    setTimeout(() => {
      notification.innerHTML= '';
    }, 5000)
  }
});