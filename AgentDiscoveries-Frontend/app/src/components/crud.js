export function createAPI (apiAddress, requestBodyJSON) {
  const tokenHeader = getTokenHeader();
  return fetch(apiAddress, {
    method: 'POST',
    headers: {
      'Authorization': tokenHeader,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: requestBodyJSON
  });
}

export function searchAPI (apiAddress, searchString) {
  const tokenHeader = getTokenHeader();
  const requestAddress = `${apiAddress}?${searchString}`;
  return fetch(requestAddress, {
    method: 'GET',
    headers: {
      'Authorization': tokenHeader,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
}

export function readAPI (apiAddress, id) {
  const tokenHeader = getTokenHeader();
  const requestAddress = `${apiAddress}/${id}`;

  return fetch(requestAddress, {
    method: 'GET',
    headers: {
      'Authorization': tokenHeader,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
}

export function updateAPI (apiAddress, id, requestBodyJSON) {
  const tokenHeader = getTokenHeader();
  const requestAddress = `${apiAddress}/${id}`;

  return fetch(requestAddress, {
    method: 'PUT',
    headers: {
      'Authorization': tokenHeader,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: requestBodyJSON
  });
}

export function updatePicture (apiAddress, id, requestBodyJSON) {
  const tokenHeader = getTokenHeader();
  const requestAddress = `${apiAddress}/${id}`;

  return fetch(requestAddress, {
    method: 'PUT',
    headers: {
      'Authorization': tokenHeader
    },
    body: requestBodyJSON
  });
}

export function deleteAPI (apiAddress, id) {
  const tokenHeader = getTokenHeader();
  const requestAddress = `${apiAddress}/${id}`;

  return fetch(requestAddress, {
    method: 'DELETE',
    headers: {
      'Authorization': tokenHeader,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
}

export function getTokenHeader () {
  return `Bearer ${window.localStorage.getItem('Token')}`;
}
