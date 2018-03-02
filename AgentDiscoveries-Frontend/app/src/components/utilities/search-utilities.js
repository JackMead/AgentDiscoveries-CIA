import { searchAPI } from '../crud';

export function getTransformedData (key, value) {
  let transformedData = value;
  if (key === 'fromTime') {
    let date = new Date(transformedData).toISOString().slice(0, 19);
    transformedData = transformedData.length > 0 && transformedData !== undefined ? `${date}Z` : '';
  } else if (key === 'toTime') {
    let date = new Date(transformedData);
    date = date.setDate(date.getDate() + 1);
    date = new Date(date).toISOString().slice(0, 19);
    transformedData = transformedData.length > 0 && transformedData !== undefined ? `${date}Z` : '';
  }
  return transformedData;
}

function getSearchParams (searchForm) {
  const searchParams = Object.keys(searchForm).map((key) => {
    return searchForm[key].value === '' ? '' : `${encodeURIComponent(key)}=${encodeURIComponent(getTransformedData(key, searchForm[key].value))}`;
  }).filter(el => el !== '' && el).join('&');
  return searchParams;
}

export function getResultsAsynch (apiAddress, searchForm) {
  const searchParams = getSearchParams(searchForm);

  var response = searchAPI(apiAddress, searchParams)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error('API server could not process the request');
      }
    });

  return response;
}
