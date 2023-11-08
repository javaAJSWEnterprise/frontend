import { getData, errorTexts, inputListeners, validPasswords, clearErrorTexts } from "../components/formSignUp.js";
import { createUser } from "../services/serviceUser.js";
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
            alert("Creando Cuenta, accediendo al homepage");
        }else{
            buttonSignUp.innerText = "Sign Up";
            errorTexts(response.body);
        }
    });
    inputListeners();
}