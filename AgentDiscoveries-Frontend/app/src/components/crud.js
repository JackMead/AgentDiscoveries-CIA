
export function createAPI(apiAddress, requestBodyJSON) {
    var tokenHeader = getTokenHeader();
    
    return fetch(apiAddress, {
        method: 'POST',
        headers: {
            'Authorization': tokenHeader,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: requestBodyJSON
    });
}

export function searchAPI(apiAddress, searchString) {
    var tokenHeader = getTokenHeader();
    var requestAddress = `${apiAddress}?${searchString}`;
    return fetch(requestAddress, {
        method: 'GET',
        headers: {
            'Authorization': tokenHeader,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

export function readAPI(apiAddress, id) {
    var tokenHeader = getTokenHeader();
    var requestAddress = `${apiAddress}/${id}`

    return fetch(requestAddress, {
        method: 'GET',
        headers: {
            'Authorization': tokenHeader,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}


export function updateAPI(apiAddress, id, requestBodyJSON) {
    var tokenHeader = getTokenHeader();
    var requestAddress = `${apiAddress}/${id}`;

    return fetch(requestAddress, {
        method: 'PUT',
        headers: {
            'Authorization': tokenHeader,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: requestBodyJSON
    });
}

export function deleteAPI(apiAddress, id) {
    var tokenHeader = getTokenHeader();
    var requestAddress = `${apiAddress}/${id}`;

    return fetch(requestAddress, {
        method: 'DELETE',
        headers: {
            'Authorization': tokenHeader,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

function getTokenHeader() {
    return `Bearer ${window.localStorage.getItem("Token")}`;
}
