import {createAPI, updateAPI} from "../crud"

export function handleReportSubmit(apiAddress, submitForm) {
  let bodyJSON = getBodyJSON(submitForm)

  bodyJSON.reportTime = new Date().toJSON()

  var requestBody = JSON.stringify(bodyJSON)

  return createAPI(apiAddress, requestBody)
      .then(response => {
        if (response.status !== 201) {
          throw "Server could not create the report. Make sure all fields are correct"
        }
      })
}

export function handleEntitySubmit(apiAddress, submitForm) {
  let bodyJSON = getBodyJSON(submitForm)
  var requestBody = JSON.stringify(bodyJSON)
  return createAPI(apiAddress, requestBody)
      .then(response => {
        if (response.status !== 201) {
          throw "Server could not create the entity. Make sure all fields are correct"
        }
      })
}

function getBodyJSON(submitForm) {
  var bodyJSON = {}
  Object.keys(submitForm).forEach((key) => {
    if (submitForm[key]) {
      let value = submitForm[key].value;
      if(key==="sendExternal"){
        value = submitForm[key].checked;
      }
      bodyJSON[key] = getTransformedData(key, value)
    }
  })
  return bodyJSON
}

function getTransformedData(key, value) {
  var transformedData = value
  if (key === "locations") {
    transformedData = value.split(/\s/).map(function (item) {
      return parseInt(item, 10)
    })
  }
  return transformedData
}
