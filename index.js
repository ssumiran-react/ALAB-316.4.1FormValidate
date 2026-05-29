let successMsg = document.getElementById("successMsg");
let loginMsg = document.getElementById("loginMsg");

const form = document.getElementById("registration");
const formLogin = document.getElementById("login");

let usernameLowercase = "";

//let userName = form.username;
// userName.addEventListener('focusout', ()=>{
//     isUsernameExist("register");
// });

form.addEventListener("submit", validateForm);

function validateForm() {
    try {
        successMsg.style.display = "block";

        if (isValidUsername(form.username)
            && isValidEmail(form.email)
            && isValidPassword(form.password, form.passwordCheck)
            && isUsernameExist("register")
            && form.terms.checked) {

            let userRegister = {};
            usernameLowercase = form.username.value.toLowerCase();
            userRegister[usernameLowercase] = usernameLowercase;
            userRegister["email"] = form.email.value.toLowerCase();
            userRegister["password"] = form.password.value;

            localStorage.setItem(usernameLowercase, JSON.stringify(userRegister));

            successMsg.style.color = "blue";
            successMsg.textContent = "User created successfully."
            return true;

        } else { //window.alert("User cannot be created.");

            successMsg.style.color = "red";
            successMsg.textContent = "User cannot be created."

            return false;
        }

        //Hide it after 3 seconds (3000 ms)
        setTimeout(() => {
            successMsg.style.display = "none";
        }, 3000);

    } catch (err) {  //window.alert("User catch.");
        const errorDisplay = document.getElementById("errorDisplay");

        errorDisplay.style.display = 'block';
        errorDisplay.firstChild.textContent(err);

        setTimeout(() => {
            errorDisplay.style.display = 'none';
        }, 4000);
    }
}

function isValidUsername(user) {
    const userRegex = /^(?=(?:([A-Za-z0-9])(?!\1))*[A-Za-z0-9]{4,}$)(?!([A-Za-z0-9])\2*$)[A-Za-z0-9]+$/;

    if (!userRegex.test(user.value)) {
        return false;
    } else {
        return true;
    }
}

function isValidEmail(email) {
    const emailVal = (email.value).toLowerCase();

    if (emailVal.includes("example.com")) {
        return false;
    } else {
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
    } else {
        return true;
    }
}

// Login Form Event
formLogin.addEventListener("submit", () => {
    successMsg.style.display = "block";
    if(isUsernameExist("login")){
        loginMsg.style.color = "green";

        if (formLogin.persist.checked){
            loginMsg.textContent = "Welcome back! Normally, this would be handled by a variety of persistent login tools and technologies";
        }else{
            loginMsg.textContent = "Welcome back!"
        }
    }else{
        loginMsg.style.color = "red";
        loginMsg.textContent = "Incorrect login information."
    }
    //Hide it after 3 seconds (3000 ms)
    setTimeout(() => {
        loginMsg.style.display = "none";
    }, 3000);
});

function isUsernameExist(loginType) {
    let loginUser = "";
    let loginPass = "";
    if (loginType == "register") {
        usernameLowercase = form.username.value.toLowerCase();
    } else {
        loginUser = formLogin.username.value.toLowerCase();
        loginPass = formLogin.password.value;
    }
    try {
        let exists = true;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i); // Get the key at index i

            if (loginType == "register") {
                if (key === usernameLowercase) { //window.alert(form.username.value + "  retypePa" + localStorage.key(0));
                    console.log(`Match found: "${usernameLowercase}" exists as a key in localStorage.`);
                    exists = false;
                    break;
                }
            } else {

                if (key === loginUser) { //window.alert(form.username.value + "  retypePa" + localStorage.key(0));
                    console.log(`Login user found: "${loginUser}" exists as a key in localStorage.`);
                    const userData = localStorage.getItem(loginUser);
                    const parsedObject = JSON.parse(userData);
                    // Loop through keys and values
                    for (const [key, value] of Object.entries(parsedObject)) {   //window.alert(`Key: ${key}, Value: ${value}`);
                        
                        if (key === "password" && loginPass !== value){
                            exists = false;
                            break;
                        }else{
                            exists = true;
                        }
                    }

                } else {
                    exists = false;
                }
            }
        }
        return exists;
    } catch (error) {
        console.error("Error from localStorage:", error);
    }
}

