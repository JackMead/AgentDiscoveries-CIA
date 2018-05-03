// A set of helper functions for making API calls

export function apiRequest(apiPath, method, body) {
    return fetch(`/v1/api/${apiPath}`, {
        method: method,
        headers: getHeaders(),
        body: body && JSON.stringify(body)
    }).then(response => {
        if (response.status >= 200 && response.status < 300) {
            // Request successful - automatically parse JSON, leave anything else alone.
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.startsWith('application/json')) {
                return response.json();
            } else {
                return response;
            }
        } else {
            // TODO: create custom error class to include the error?
            const message = `Received ${response.status} ${response.statusText} when performing ${method} ${apiPath}`;
            console.error(message);
            throw new Error(message);
        }
    });
}

// Generic API request methods. Non-POST methods may take an optional 'id'

export function apiGet(apiPath, id) {
    const path = id ? `${apiPath}/${id}` : apiPath;
    return apiRequest(path, 'GET');
}

export function apiPost(apiPath, body) {
    return apiRequest(apiPath, 'POST', body);
}

export function apiPut(apiPath, body, id) {
    const path = id ? `${apiPath}/${id}` : apiPath;
    return apiRequest(path, 'PUT', body);
}

export function apiDelete(apiPath, id) {
    const path = id ? `${apiPath}/${id}` : apiPath;
    return apiRequest(path, 'DELETE');
}

// Form-specific API request methods

export function apiFormCreate(apiPath, form) {
    return apiPost(apiPath, prepareForm(form));
}

export function apiFormUpdate(apiPath, form, id) {
    return apiPut(apiPath, prepareForm(form), id);
}

// Helper Functions for headers

export function getTokenHeader() {
    return `Bearer ${window.localStorage.getItem('Token')}`;
}

function getHeaders() {
    return {
        'Authorization': getTokenHeader(),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
}

// Helper functions for forms

export function prepareForm(form) {
    const result = {};

    Object.keys(form).forEach(key => {
        if (form[key]) {
            const value = form[key].type === 'checkbox'
                ? form[key].checked
                : form[key].value;

            result[key] = transformFormProperty(key, value);
        }
    });
    return result;
}

function transformFormProperty(key, value) {
    switch (key) {
        case 'locations':
            return value.split(/\s/).map(item => parseInt(item, 10));
        default:
            return value;
    }
}
