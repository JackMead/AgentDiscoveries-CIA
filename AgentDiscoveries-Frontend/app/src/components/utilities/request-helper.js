// A set of helper functions for making API calls

import {clearUserInfo, currentAuthToken} from './user-helper';
import ApiError from './api-error';

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
        } else if (response.status === 401) {
            // Token is no longer valid - clear it and redirect to login
            clearUserInfo();
            window.location.hash = '#/';
            throw new Error('Authentication Token has expired, please log in');
        } else {
            throw new ApiError(response);
        }
    })
//		.catch(error => {
//    	error.response.json().then(result => {
//            throw new Error(result.message);
//    		console.log(result);
//    	})
//    })
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
    return apiRequest(path, 'PUT', body)
}

export function apiDelete(apiPath, id) {
    const path = id ? `${apiPath}/${id}` : apiPath;
    return apiRequest(path, 'DELETE');
}

// Helper Functions for headers

export function getTokenHeader() {
    return `Bearer ${currentAuthToken()}`;
}

function getHeaders() {
    return {
        'Authorization': getTokenHeader(),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
}
