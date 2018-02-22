import { createAPI, updateAPI } from "../crud"

const EXTERNAL_API = "http://35.177.80.2"

export function handleReportSubmit(apiAddress, submitForm) {
    let bodyJSON = getBodyJSON()

    bodyJSON.reportTime = new Date().toJSON()

    var requestBody = JSON.stringify(bodyJSON)

    return createAPI(apiAddress, requestBody)
        .then(response => {
            if (response.status !== 201) {
                throw "Server could not create the report. Make sure all fields are correct"
            }
        })
}

export function handleExternalReportSubmit(submitForm) {
    let bodyJSON = {}
    
    bodyJSON.agentId = 1 //TODO: set this to the agent's actual ID
    bodyJSON.reportBody = submitForm.reportBody.value
    bodyJSON.locationId = submitForm.locationId.value
    var requestBody = JSON.stringify(bodyJSON)
    return createAPI(`${EXTERNAL_API}/reports`, requestBody)
        .then(response => {
            if (!response.ok) {
                if (response.status === 400) {
                    throw "Could not submit report to the external API. Bad Request"
                } else if (response.status === 422) {
                    throw `Could not submit report to the external API. Some fields are incorrect`
                } else {
                    throw `Could not submit report to the external API. Server error`
                }
                
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
            bodyJSON[key] = getTransformedData(key, submitForm[key].value)
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
