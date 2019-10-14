// Wrapper for localstorage to save user info

export function storeUserInfo(userInfo) {
    window.localStorage.setItem('Token', userInfo.token);
    window.localStorage.setItem('UserId', userInfo.userId);
    window.localStorage.setItem('Admin', userInfo.isAdmin ? 'true' : 'false');
    window.localStorage.setItem('AgentId', userInfo.agentId);

    updateListeners();
}

export function clearUserInfo() {
    window.localStorage.clear('Token');
    window.localStorage.clear('UserId');
    window.localStorage.clear('Admin');
    window.localStorage.clear('AgentId');

    updateListeners();
}

export function isLoggedIn() {
    return !!window.localStorage.getItem('Token');
}

export function currentUserId() {
    return window.localStorage.getItem('UserId');
}

export function currentAuthToken() {
    return window.localStorage.getItem('Token');
}

export function isAdmin(){
    return window.localStorage.getItem('Admin') === 'true';
}

export function isAgent() {
    return window.localStorage.getItem('AgentId') !== null;
}

// Fire a 'login' event when the user info is updated.
// Components may listen for this event to update internal state (e.g. displaying nav bar options)
function updateListeners() {
    window.dispatchEvent(new Event('login'));
}
