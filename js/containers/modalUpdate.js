import {spinnerWhite} from '../components/spinners.js'
import {updateUser} from '../services/serviceUser.js';

const inputFirstName = document.getElementById('input-firstName-signUp');
const inputLastName = document.getElementById('input-lastName-signUp');
const inputBirthday = document.getElementById('input-birthday-signUp');

const errorFirstName = document.getElementById('errorText-firstName-signUp');
const errorLastName = document.getElementById('errorText-lastName-signUp');
const errorBirthday = document.getElementById('errorText-birthday-signUp');


const form = document.getElementById('form-update');


const buttonForm = document.getElementById('button-signUp');

export const updateModal = (data) =>{
    let names = data.name.split(' ');

    inputFirstName.value = names[0];
    inputLastName.value = names[1];
    inputBirthday.value = data.birthDate.split('T')[0];
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
    } 
};


form.addEventListener('submit', async (e) =>{
    e.preventDefault();
    buttonForm.innerHTML = spinnerWhite();

    let userUpdate1 = {
        firstname : inputFirstName.value,
        lastname :  inputLastName.value,
        birthDate : inputBirthday.value
    }

    let response = await updateUser(userUpdate1);
    if(response.status){
        buttonForm.innerHTML = `
        <span class="material-symbols-outlined">
            done
        </span>
        `;
        setTimeout(() => {
            buttonForm.innerHTML = "Update";
        }, 1500);
    }else{
        errorTexts(response.body);
        buttonForm.innerHTML = "Update";
    }

});

inputListeners();