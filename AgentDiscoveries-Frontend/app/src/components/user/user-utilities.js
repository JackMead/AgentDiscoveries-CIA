
export function makeAuthenticationAPICall(apiAddress, requestBodyJSON) {
    console.log(requestBodyJSON)
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

export function getIsLoggedInMessage() {
    var isLoggedInMessage = isLoggedIn() ? "User is logged in" : "User is not logged in";
    return isLoggedInMessage;
}

export function isLoggedIn() {
    let token = window.localStorage.getItem("Token");
    return token && true;
}

export function logOut() {
    console.log("logging out");
    window.localStorage.clear("Token");
}
