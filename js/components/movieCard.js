import { createFav } from '../services/serviceStreamingFavorites.js';
import {searchById} from './../services/serviceStreamingSearch.js';

export const card = (movie, isFavPage, token) => {

    let isFav = movie.isFav;

    let function1 = "";
    if(!isFavPage){
        function1 = `addFav('${movie.imdbId}')`;
    }else{
        function1 = `removeFav('${movie.imdbId}')`; 
    }

    let favButton = "";

    if(token){
        favButton = 
        `<div class="container-card-icon">
            <span id="card-icon-${movie.imdbId}" onclick=${function1} class="material-symbols-outlined card-icon ${!isFav ? "" : "card-icon--red"  }">
                favorite
            </span>
        </div>`
    }

    return `
    <div id="card-${movie.imdbId}" class="card">
        ${favButton}
        <img id="img-${movie.imdbId}" src="${movie.image.url}" class="card-img-top" alt="${movie.title}">
        <div class="card-body">
            <h5 id="title-${movie.imdbId}" class="card-title">${movie.title}</h5>
            <p  class="card-text">${movie.type} - ${movie.year}</p>
            <a  class="btn btn-danger w-100 buton-detail btn-detail" onclick="viewDetail('${movie.imdbId}')" >View Platforms</a>
        </div>
    </div>
    `;
}

const viewDetail = async (id) => {
    const response = await searchById(id);
    const movieDetails =  response.body;
    const modal = new bootstrap.Modal(document.getElementById('movieModal'));
    if(!response.status){
        document.getElementById('modalTitle').innerText = document.getElementById(`title-${id}`).innerText;
        const movieInfoElement = document.getElementById('movieInfo');
        const url = document.getElementById(`img-${id}`).src;
        movieInfoElement.innerHTML = `
            <img src="${url}" class="img-fluid" alt="${movieDetails.title}">
        `;
        const platformListElement = document.getElementById('platformList');
        platformListElement.innerHTML = `
         <h2 class="error-text">Platforms not found</h2>
        `;
        modal.show();
        return;
    }else{
        document.getElementById('modalTitle').innerText = movieDetails.title;
        const movieInfoElement = document.getElementById('movieInfo');
        movieInfoElement.innerHTML = `
            <img src="${movieDetails.image.url}" class="img-fluid" alt="${movieDetails.title}">
        `;
        // Limpia la lista de plataformas
        const platformListElement = document.getElementById('platformList');
        platformListElement.innerHTML = '';
    
        // Llena la lista de plataformas dinámicamente
        const platforms = movieDetails.streamingInfo.ar || [];
        platforms.forEach( platform => {
            let div = `
                <li>
                    <img class="image-platform" src="../../assets/${platform.service}.png"></img>
                </li>
            `;
    
            platformListElement.innerHTML += div;
        })
    
        
        modal.show();
    }
}

const addFav = async (id) => {
    const icon = document.getElementById(`card-icon-${id}`);
    
    await createFav(id);
    
    if(icon.classList.contains('card-icon--red')){
        icon.classList.remove('card-icon--red');
    }else{
        icon.classList.add('card-icon--red');
    }

}

const removeFav = async (id) => {
    const card = document.getElementById(`card-${id}`);
    await createFav(id);
    card.remove();
    const container = document.getElementById('movie-container');

    if(container.children.length == 0){
        container.innerHTML = "<h2>You have no favorites. Start adding movies or series!!!!</h2> ";
    }
}

window.removeFav = await removeFav;
window.addFav = await addFav;
window.viewDetail = await viewDetail;

