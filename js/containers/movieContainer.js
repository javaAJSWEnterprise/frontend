import { card } from "../components/movieCard.js";
import { searchByTitle } from "../services/serviceStreamingSearch.js";
import { spinnerWhite } from "../components/spinners.js";

const container = document.getElementById('movie-container');
const inputTitle = document.getElementById('input-title');
const search = document.getElementById('search');


export const searchListener = () => {
    const performSearch = async () => {
        container.innerHTML = spinnerWhite();
        let title = inputTitle.value;
        let response = await searchByTitle(title);
        containerResults(response.body);
    };

    // Evento al hacer clic en el botón de búsqueda
    search.addEventListener('click', performSearch);

    // Evento al presionar la tecla "Enter" en el campo de entrada
    inputTitle.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
};


export const containerResults = (results) => {
    container.innerHTML = "";
    results.forEach(movie => {
        container.innerHTML += card(movie);
    });
}