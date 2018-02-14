
export function makeAuthenticationAPICall(apiAddress, requestBodyJSON) {
    var requestBody = JSON.stringify(requestBodyJSON);
    return fetch(apiAddress, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: requestBody
    });
}

export function isLoggedIn() {
    let token = window.localStorage.getItem("Token");
    return !!token;
}

export function logOut() {
    console.log("logging out");
    window.localStorage.clear("Token");
}
