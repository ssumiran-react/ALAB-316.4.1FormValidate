const form = document.getElementById("registration");

form.addEventListener("submit", validateForm);

function validateForm(e) {
    return isValidPassword(form.password, form.passwordCheck)
        && isValidUsername(form.username)
        && isValidEmail(form.email)
        && form.terms.checked;
}

function isValidUsername(user) {
    const userRegex = /^(?=(?:([A-Za-z0-9])(?!\1))*[A-Za-z0-9]{4,}$)(?!([A-Za-z0-9])\2*$)[A-Za-z0-9]+$/;
    
    if (!userRegex.test(user.value)) {
        return false;
    }else{
        return true;
    }
}

function isValidEmail(email) {
    const emailVal = (email.value).toLowerCase();

    if (emailVal.includes("example.com")) {
        return false;
    }else{
        return true;
    }
}

function isValidPassword(password, passwordCheck) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\\/]).{12,}$/;
    
    if (password.value.includes(form.username.value)
        || password.value.toLowerCase().includes("password")
        || (!passwordRegex.test(password.value))
        || (password.value !== passwordCheck.value)) {   //window.alert((passwordCheck.value) + "  retypePassword");
        return false;
    }else{
        return true;
    }
}

