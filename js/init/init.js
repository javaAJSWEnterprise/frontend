import { updateModal } from "../containers/modalUpdate.js";
import { searchListener } from "../containers/movieContainer.js";
import { getById } from "../services/serviceUser.js";
import {spinnerWhite} from '../components/spinners.js';
import { getMyFavs } from '../services/serviceStreamingFavorites.js';
import {card} from '../components/movieCard.js';

const buttonLogin = document.getElementById("login");
const buttonLogout = document.getElementById("logout");

const favButton = document.getElementById("myFavs");
const container = document.getElementById('movie-container');

let token = localStorage.getItem("jwt");

if (token) {
    buttonLogin.style.display = "none";
}else {
    buttonLogout.style.display = "none";
}

buttonLogout.addEventListener('click', (e) =>{
    localStorage.removeItem("jwt");
});


const userButton = document.getElementById("user-modal");

userButton.addEventListener('click', async () => {
    const modal = new bootstrap.Modal(document.getElementById('userModal'));
    let user = await getById();
    console.log(user);
    updateModal(user);
    modal.show();
});

favButton.addEventListener('click', async (e) => {
    container.innerHTML = spinnerWhite();
    let response = await getMyFavs();
    containerResults(response.body);
});

searchListener();

const containerResults = (results) => {
    container.innerHTML = "";
    if(results.length > 0) {
        results.forEach(movie => {
            container.innerHTML += card(movie, true, true);
        });
    }else {
        container.innerHTML = "<h2>No title found...</h2> ";
    }
}