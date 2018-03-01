import { searchAPI, readAPI } from '../crud';

export function getAll (api) {
  return searchAPI(`v1/api/${api}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(`Could not get entities from the ${api} API`);
      }
    })
    .then(results => {
      return filterResults(results);
    });
}

export function getEntity (api, id) {
  return readAPI(`v1/api/${api}`, id)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(`Could not retrieve the entity with id ${id} from the ${api} API`);
      }
    })
    .then(results => {
      return filterResult(results);
    });
}

function filterResults (results) {
  results.forEach(val => {
    delete val.hashedPassword; // we don't want this to be rendered
    if (val.isAdmin) {
      val.isAdmin = 'yes';
    }
  });

  return results;
}
function filterResult (result) {
  delete result.hashedPassword; // we don't want this to be rendered
  if (result.isAdmin) {
    result.isAdmin = 'yes';
  }
  return result;
}
