const usernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const confirmPasswordEl = document.querySelector('#confirm-password');
const form = document.querySelector('#signup');

const checkUsername = () => {
    let valid = false;
    const min = 3;
    const max = 25;
    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, 'Nom d\'utilisateur ne peut pas être vide.');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Le nom d'utilisateur doit comporter entre ${min} et ${max} caractères.`);
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};

const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();

    if (!isRequired(email)) {
        showError(emailEl, 'L\'e-mail ne peut pas être vide.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'L\'e-mail n\'est pas valide.');
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false;
    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, 'Le mot de passe ne peut pas être vide.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Le mot de passe doit comporter au moins 8 caractères, dont au moins 1 caractère minuscule, 1 caractère majuscule, 1 chiffre et 1 caractère spécial parmi (!@#$%^&*).');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }
    return valid;
};

const checkConfirmPassword = () => {
    let valid = false;
    const confirmPassword = confirmPasswordEl.value.trim();
    const password = passwordEl.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordEl, 'Veuillez saisir à nouveau le mot de passe.');
    } else if (password !== confirmPassword) {
        showError(confirmPasswordEl, 'Le mot de passe ne correspond pas.');
    } else {
        showSuccess(confirmPasswordEl);
        valid = true;
    }
    return valid;
};

const isEmailValid = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[A-Za-z\d!@#\$%\^&\*]{8,}$/;
    return re.test(password);
};

const isRequired = (value) => value === '' ? false : true;

const isBetween = (length, min, max) => length < min || length > max ? false : true;

const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove('success');
    formField.classList.add('error');
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    const formField = input.parentElement;
    formField.classList.remove('error');
    formField.classList.add('success');
    const error = formField.querySelector('small');
    error.textContent = '';
};

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();
    let isFormValid = isUsernameValid &&
                     isEmailValid &&
                     isPasswordValid &&
                     isConfirmPasswordValid;
    if (isFormValid) {
        // soumission du form
    }
});

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirm-password':
            checkConfirmPassword();
            break;
    }
}));
