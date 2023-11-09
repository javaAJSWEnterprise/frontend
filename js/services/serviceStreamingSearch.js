const  urlBase = "http://localhost:8080/v1/title"


export const searchById = async (id) =>{
    const url = `${urlBase}/id/${id}`;
    let dataResponse = {
        status : true,
        body : null
    };
    await fetch(url, {
        method: 'GET'
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

export const searchByTitle = async (title) =>{
    const url = `${urlBase}/${title}`;
    let dataResponse = {
        status : true,
        body : null
    };
    await fetch(url, {
        method: 'GET'
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