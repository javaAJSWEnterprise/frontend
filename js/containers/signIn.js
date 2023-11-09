import { getData, inputListeners, clearErrorTexts } from "../components/formSignIn.js";
import { spinnerWhite } from "../components/spinners.js";
import { login } from "../services/serviceUser.js";

const formSignIn = document.getElementById("form-signIn");
const errorText = document.getElementById("errorText-signIn");
const buttonSignIn = document.getElementById("button-signIn");

export const listenerSignIn = () =>{
    formSignIn.addEventListener("submit", async (e) => {
        e.preventDefault();
        clearErrorTexts();
        buttonSignIn.innerHTML = spinnerWhite();
        let auth = getData();
        let response = await login(auth);
        if(response.status){
            localStorage.setItem("jwt", response.body.token);
            window.location = "../../pages/index.html";
        }else{
            buttonSignIn.innerText = "Sign In";
            errorText.innerText = response.body.message;
        }
    });
    inputListeners();
}


