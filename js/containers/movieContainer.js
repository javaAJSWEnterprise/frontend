import { card } from "../components/movieCard.js";
import { searchByTitle } from "../services/serviceStreamingSearch.js";
import { spinnerWhite } from "../components/spinners.js";

const container = document.getElementById('movie-container');
const inputTitle = document.getElementById('input-title');
const search = document.getElementById('search');


export const searchListener = () =>{
    search.addEventListener('click', async (e) => {
        container.innerHTML =  spinnerWhite();
        let title = inputTitle.value;
        let response = await searchByTitle(title);
        containerResults(response.body);
    });
}


export const containerResults = (results) => {
    container.innerHTML = "";
    results.forEach(movie => {
        container.innerHTML += card(movie);
    });
}