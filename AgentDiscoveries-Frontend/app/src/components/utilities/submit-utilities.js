import {createAPI, updateAPI} from '../crud';

export function handleReportSubmit(apiAddress, submitForm) {
  let bodyJSON = getBodyJSON(submitForm);

  bodyJSON.reportTime = new Date().toJSON();

  const requestBody = JSON.stringify(bodyJSON);
  return createAPI(apiAddress, requestBody)
      .then(response => {
        if (response.status !== 201) {
          throw Error('Server could not create the report: '+response.statusText);
        }
      });
}

export function handleExternalReportSubmit(submitForm) {
  const bodyJSON = getBodyJSON(submitForm);
  const requestBody = JSON.stringify(bodyJSON);

  return createAPI('/v1/api/external/reports', requestBody)
      .then(response => {
        if (!response.ok) {
          if (response.status === 400) {
            throw Error("Could not submit report to the external API. Bad Request");
          } else if (response.status === 422) {
            throw Error(`Could not submit report to the external API. Some fields are incorrect`);
          } else {
            throw Error(`Could not submit report to the external API. Server error`);
          }
        }
      });
}

export function handleEntitySubmit(apiAddress, submitForm) {
  let bodyJSON = getBodyJSON(submitForm);
  const requestBody = JSON.stringify(bodyJSON);
  return createAPI(apiAddress, requestBody)
      .then(response => {
        if (response.status !== 201) {
          throw Error('Server could not create the entity. Make sure all fields are correct');
        } else {
          return response.json();
        }
      });
}

export function handleEntityEdit(apiAddress, id, submitForm) {
  let bodyJSON = getBodyJSON(submitForm);
  const requestBody = JSON.stringify(bodyJSON);

  return updateAPI(apiAddress, id, requestBody)
      .then(response => {
        if (response.status >= 300) {
          throw Error('Server could not update the entity. Make sure all fields are correct');
        } else {
          return response.json();
        }
      });
}

export function getBodyJSON(submitForm) {
  const bodyJSON = {};
  Object.keys(submitForm).forEach((key) => {
    if (submitForm[key]) {
      let value = submitForm[key].value;
      if (submitForm[key].type==="checkbox") {
        value = submitForm[key].checked;
      }
      bodyJSON[key] = getTransformedData(key, value);
    }
  });
  return bodyJSON;
}

function getTransformedData(key, value) {
  let transformedData = value;
  if (key === 'locations') {
    transformedData = value.split(/\s/).map(function (item) {
      return parseInt(item, 10);
    });
  }
  return transformedData;
}
