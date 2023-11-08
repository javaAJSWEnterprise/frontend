const inputEmail = document.getElementById('input-email-signIn');
const inputPassword = document.getElementById('input-password-signIn');
const errorText = document.getElementById('errorText-signIn');
const visibilityEye = document.getElementById('icon-input-password-signIn');

export const inputListeners = () =>{
    inputEmail.addEventListener('keyup', (e) => {
        errorText.innerText = '';
    });
    inputPassword.addEventListener('keyup', (e) => {
        errorText.innerText = '';
    });

    visibilityEye.addEventListener('click', (e) => {
        let {target} = e;
        if(target.innerText == "visibility"){
            target.innerText = "visibility_off";
            inputPassword.type = "password";
        }else{
            target.innerText = "visibility";
            inputPassword.type = "text";
        }
    });
}

export const getData = () => {
    let auth = {
        email : inputEmail.value,
        password : inputPassword.value
    }

    return auth;
}

export const clearErrorTexts = () => {
    errorText.innerText = '';
};