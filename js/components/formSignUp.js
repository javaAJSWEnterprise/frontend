const inputFirstName = document.getElementById('input-firstName-signUp');
const inputLastName = document.getElementById('input-lastName-signUp');
const inputBirthday = document.getElementById('input-birthday-signUp');
const inputEmail = document.getElementById('input-email-signUp');
const inputPassword = document.getElementById('input-password-signUp');
const inputSecondPassword = document.getElementById('input-secondPassword-signUp');

const errorFirstName = document.getElementById('errorText-firstName-signUp');
const errorLastName = document.getElementById('errorText-lastName-signUp');
const errorBirthday = document.getElementById('errorText-birthday-signUp');
const errorEmail = document.getElementById('errorText-email-signUp');
const errorPassword = document.getElementById('errorText-password-signUp');
const errorSecondPassword = document.getElementById('errorText-secondPassword-signUp');

const visibilityEyePassword = document.getElementById('icon-input-password-signUp');
const visibilityEyeSecondPassword = document.getElementById('icon-input-secondPassword-signUp');

export const validPasswords = () =>{
    let valid = inputPassword.value == inputSecondPassword.value;
    if(!valid){
        errorSecondPassword.innerText = "the passwords do not match";
    }
    return valid;
}

export const inputListeners = () =>{
    inputFirstName.addEventListener('keyup', (e) =>{
        errorFirstName.innerText = "";
    });

    inputLastName.addEventListener('keyup', (e) =>{
        errorLastName.innerText = "";
    });

    inputBirthday.addEventListener('keyup', (e) =>{
        errorBirthday.innerText = "";
    });

    inputEmail.addEventListener('keyup', (e) =>{
        errorEmail.innerText = "";
    });

    inputPassword.addEventListener('keyup', (e) =>{
        errorPassword.innerText = "";
    });

    inputSecondPassword.addEventListener('keyup', (e) =>{
        errorSecondPassword.innerText = "";
    });
    visibilityEyePassword.addEventListener('click', (e) => {
        let {target} = e;
        if(target.innerText == "visibility"){
            target.innerText = "visibility_off";
            inputPassword.type = "password";
        }else{
            target.innerText = "visibility";
            inputPassword.type = "text";
        }
    });

    visibilityEyeSecondPassword.addEventListener('click', (e) => {
        let {target} = e;
        if(target.innerText == "visibility"){
            target.innerText = "visibility_off";
            inputSecondPassword.type = "password";
        }else{
            target.innerText = "visibility";
            inputSecondPassword.type = "text";
        }
    });
};

export const errorTexts = (userError) => {
    if (userError) {
        if (userError.firstname) {
            errorFirstName.innerText = userError.firstname;
        }
        if (userError.lastname) {
            errorLastName.innerText = userError.lastname;
        }

        if (userError.birthDate) {
            errorBirthday.innerText = userError.birthDate;
        } 
        
        if (userError['auth.email']) {
            errorEmail.innerText = userError['auth.email'];
        }

        if (userError['auth.password']) {
            errorPassword.innerText = userError['auth.password'];
        }

        if(userError.message){
            errorEmail.innerText = userError.message;
        }
    } 
};

export const getData = () => {
    let user = {
        firstname : inputFirstName.value,
        lastname : inputLastName.value,
        auth :{
            email : inputEmail.value,
            password : inputPassword.value,
        },
        birthDate : inputBirthday.value,
    }
    return user;
};

export const clearErrorTexts = () => {
    errorFirstName.innerText = '';
    errorLastName.innerText = '';
    errorBirthday.innerText = '';
    errorEmail.innerText = '';
    errorPassword.innerText = '';
    errorSecondPassword.innerText = '';
};