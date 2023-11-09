import { getData, errorTexts, inputListeners, validPasswords, clearErrorTexts } from "../components/formSignUp.js";
import { createUser, login } from "../services/serviceUser.js";
import { spinnerWhite } from "../components/spinners.js";

const formSignUp = document.getElementById("form-signUp");
const buttonSignUp = document.getElementById("button-signUp");

export const listenerSignUp = () =>{
    formSignUp.addEventListener("submit", async (e) => {
        e.preventDefault();
        clearErrorTexts();
        if(!validPasswords()){
            return;
        }
        buttonSignUp.innerHTML = spinnerWhite();
        let user = getData();
        console.log(user);
        let response = await createUser(user);
        console.log(response);
        if(response.status){
            debugger;
            let responseAuth = await login({email: user.auth.email, password: user.auth.password});
            localStorage.setItem('jwt', responseAuth.body.token);
            window.location = "../../pages/index.html"
        }else{
            buttonSignUp.innerText = "Sign Up";
            errorTexts(response.body);
        }
    });
    inputListeners();
}