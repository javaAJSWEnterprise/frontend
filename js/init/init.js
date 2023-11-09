import { updateModal } from "../containers/modalUpdate.js";
import { searchListener } from "../containers/movieContainer.js";
import { getById } from "../services/serviceUser.js";


const buttonLogin = document.getElementById("login");
const buttonLogout = document.getElementById("logout");

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

searchListener();
