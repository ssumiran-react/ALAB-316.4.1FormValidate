const form = document.getElementById("registration");

form.addEventListener("submit", validateForm);

       
  //window.alert(form.terms.checked);
function validateForm(e){
    

    return validateUsername(form.username) 
        //validateEmail(form.email)
       && form.terms.checked;
    
}

function validateUsername(user) {
    const userRegex = /^(?=(?:([A-Za-z0-9])(?!\1))*[A-Za-z0-9]{4,}$)(?!([A-Za-z0-9])\2*$)[A-Za-z0-9]+$/;
    if (!userRegex.test(user.value)){ window.alert((user.value));
        //return false;
    }
    return true;
}
function validateEmail(email) {
    const emailVal = (email.value).toLowerCase();
    //const emailRegex = new RegExp('^[a-zA-Z0-9._%+-]+@(?!example\.com$)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
    
    if (emailVal.includes("example.com")){
        //return false; 
    }
    return true;
}
function validatePassword(user) {
    if ((user.value).trim().length < 4){
        window.alert((user.value).trim().length);
    }
}

/*
Registration Form - Username Validation:
The username cannot be blank.
The username must be at least four characters long.
The username must contain at least two unique characters.
The username cannot contain any special characters or whitespace.

Registration Form - Email Validation:
The email must be a valid email address.
The email must not be from the domain "example.com."

Registration Form - Password Validation:
Passwords must be at least 12 characters long.
Passwords must have at least one uppercase and one lowercase letter.
Passwords must contain at least one number.
Passwords must contain at least one special character.
Passwords cannot contain the word "password" (uppercase, lowercase, or mixed).
Passwords cannot contain the username.
Both passwords must match.

Registration Form - Terms and Conditions:
The terms and conditions must be accepted.*/