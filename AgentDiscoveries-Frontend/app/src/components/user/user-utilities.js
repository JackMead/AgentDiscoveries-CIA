export function makeAuthenticationAPICall(apiAddress, requestBodyJSON) {
  var requestBody = JSON.stringify(requestBodyJSON);
  return fetch(apiAddress, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: requestBody
  });
}

export function isLoggedIn() {
  let token = window.localStorage.getItem("Token");
  return !!token;
}

export function isAdmin(){
  let admin = window.localStorage.getItem("Admin");
  return admin==="true";
}

export function logOut() {
  window.localStorage.clear("Token");
  window.localStorage.clear("UserId");
  window.localStorage.clear("Admin");
}

export function logIn(response) {
  window.localStorage.setItem("Token", response.token);
  window.localStorage.setItem("UserId", response.userId);
  window.localStorage.setItem("Admin", response.isAdmin?"true":"false");
}