const form = document.getElementById("registration");
const allNames = form.getAttributeNames("username");


form.addEventListener("submit", validateForm());

function validateForm(){
    //window.alert("test");
    console.log("test",form.username.value);
}