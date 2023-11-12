const  urlBase = "http://localhost:8080/v1/favorite"


export const createFav = async (id) =>{
    const url = `${urlBase}/${id}`;
    let dataResponse = {
        status : true,
        body : null
    };
    await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            dataResponse.status = false;
        }
        return response.json();
    })
    .then(data => {
        dataResponse.body = data;
    })
    .catch(error => {
        console.error('Error:', error);
    });

    return dataResponse;
};

export const getMyFavs = async () =>{
    const url = `${urlBase}`;
    let dataResponse = {
        status : true,
        body : null
    };
    await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            dataResponse.status = false;
        }
        return response.json();
    })
    .then(data => {
        dataResponse.body = data;
    })
    .catch(error => {
        console.error('Error:', error);
    });

    return dataResponse;
};

