import {searchById} from './../services/serviceStreamingSearch.js';

export const card = (movie) => {
    return `
    <div class="card">
        <div class="container-card-icon">
            <span id="card-icon-${movie.imdbId}" onclick="addFav('${movie.imdbId}')" class="material-symbols-outlined card-icon">
                favorite
            </span>
        </div>
        <img id="img-${movie.imdbId}" src="${movie.image.url}" class="card-img-top" alt="${movie.title}">
        <div class="card-body">
            <h5 id="title-${movie.imdbId}" class="card-title">${movie.title}</h5>
            <p  class="card-text">${movie.type} - ${movie.year}</p>
            <a  class="btn btn-danger w-100 buton-detail" onclick="viewDetail('${movie.imdbId}')" >View Platforms</a>
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
    if(icon.classList.contains('card-icon--red')){
        icon.classList.remove('card-icon--red');
    }else{
        icon.classList.add('card-icon--red');
    }

}

window.addFav = await addFav;
window.viewDetail = await viewDetail;

