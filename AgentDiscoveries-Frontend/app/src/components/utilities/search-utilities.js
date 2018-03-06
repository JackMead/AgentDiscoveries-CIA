import { searchAPI } from '../crud';

export function getTransformedData (key, value) {
  let transformedData = value;
  if (key === 'fromTime') {
    let date = new Date(transformedData);
    transformedData = transformedData.length > 0 && transformedData !== undefined ? getDateString(date) : '';
  } else if (key === 'toTime') {
    let date = new Date(transformedData);
    date.setDate(date.getDate() + 1);
    transformedData = transformedData.length > 0 && transformedData !== undefined ? getDateString(date) : '';
  }
  return transformedData;
}

export function getDateString(date){
  return date.toISOString().slice(0, 19)+'Z';
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
