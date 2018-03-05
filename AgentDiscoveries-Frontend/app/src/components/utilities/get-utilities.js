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
    .then(result => {
      return filterResult(result);
    });
}

export function filterResults (results) {
  results.forEach(val => {
    delete val.hashedPassword; // we don't want this to be rendered
    if (val.admin) {
      val.admin = 'yes';
    }
  });

  return results;
}
export function filterResult (result) {
  delete result.hashedPassword; // we don't want this to be rendered
  if (result.admin) {
    result.admin = 'yes';
  }
  return result;
}
