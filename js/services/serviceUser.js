const  urlBase = "http://localhost:8081/v1/users"


export const login = async (auth) =>{
    const url = `${urlBase}/login`;
    let dataResponse = {
        status : true,
        body : null
    };
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(auth)
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

export const createUser = async (user) =>{
    const url = `${urlBase}/register`;
    let dataResponse = {
        status : true,
        body : null
    };
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
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

export const updateUser = async (user) =>{
    const url = `${urlBase}`;
    let dataResponse = {
        status : true,
        body : null
    };
    await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
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

export const getById = async () =>{
    const url = `${urlBase}`;
    let dataResponse;
    await fetch(url, {
        method: 'GET',
        headers : {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        }
    })
    .then(response => response.json())
    .then(data => {
        dataResponse = data;
    })
    .catch(error => {
        console.error('Error:', error);
    });

    return dataResponse;
};