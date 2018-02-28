import { createAPI, updateAPI } from "../crud"

export function handleReportSubmit(apiAddress, submitForm) {
    let bodyJSON = {}
    Object.keys(submitForm).forEach((key) => {
        bodyJSON[key] = getTransformedData(key, submitForm[key].value)
    })

    bodyJSON.reportTime = new Date().toJSON()

    const requestBody = JSON.stringify(bodyJSON)

    return createAPI(apiAddress, requestBody)
        .then(response => {
            if (response.status !== 201) {
                throw("Server could not create the report. Make sure all fields are correct")
            }
        })
}

export function handleEntitySubmit(apiAddress, submitForm) {
    let bodyJSON = getBodyJSON(submitForm)
    const requestBody = JSON.stringify(bodyJSON)
    return createAPI(apiAddress, requestBody)
        .then(response => {
            if (response.status !== 201) {
                throw ("Server could not create the entity. Make sure all fields are correct")
            }
        })
}

export function handleEntityEdit(apiAddress, id, submitForm) {
    let bodyJSON = getBodyJSON(submitForm)
    const requestBody = JSON.stringify(bodyJSON)
    
    return updateAPI(apiAddress, id, requestBody)
        .then(response => {
            if (response.status >= 400) {
                throw ("Server could not update the entity. Make sure all fields are correct")
            }
        })
}

function getBodyJSON(submitForm) {
    const bodyJSON = {}
    Object.keys(submitForm).forEach((key) => {
        if (submitForm[key]) {
            bodyJSON[key] = getTransformedData(key, submitForm[key].value)
        }
    })
    return bodyJSON
}

function getTransformedData(key, value) {
    let transformedData = value
    if (key === "locations") {
        transformedData = value.split(/\s/).map(function (item) {
            return parseInt(item, 10)
        })
    }
    return transformedData
}
