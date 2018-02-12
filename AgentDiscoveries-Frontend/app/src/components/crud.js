
function createAPI(apiAddress, requestBodyJSON) {
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

function searchAPI(apiAddress, searchString) {
    var tokenHeader = getTokenHeader();
    var requestAddress = apiAddress + "?" + searchString;
    console.log(requestAddress)
    return fetch(requestAddress, {
        method: 'GET',
        headers: {
            'Authorization': tokenHeader,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

function readAPI(apiAddress, id) {
    var tokenHeader = getTokenHeader();
    var requestAddress = apiAddress + "/" + id

    return fetch(requestAddress, {
        method: 'GET',
        headers: {
            'Authorization': tokenHeader,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}


function updateAPI(apiAddress, id, requestBodyJSON) {
    var tokenHeader = getTokenHeader();
    var requestAddress = apiAddress + "/" + id

    return fetch(requestAddress + "/" + id, {
        method: 'PUT',
        headers: {
            'Authorization': tokenHeader,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: requestBodyJSON
    });
}

function deleteAPI(apiAddress, id) {
    var tokenHeader = getTokenHeader();
    var requestAddress = apiAddress + "/" + id;

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
    return "Bearer " + window.localStorage.getItem("Token");
}

export{
    createAPI,
    searchAPI,
    readAPI,
    updateAPI,
    deleteAPI
}