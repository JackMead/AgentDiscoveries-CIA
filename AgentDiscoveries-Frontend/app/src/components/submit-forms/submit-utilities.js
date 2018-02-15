import { createAPI } from "../crud"

export function handleReportSubmit(apiAddress, submitForm) {
    console.log(submitForm)
    let bodyJSON = {};
    Object.keys(submitForm).forEach((key) => {
        bodyJSON[key] = getTransformedData(key, submitForm[key].value);
    });

    bodyJSON.reportTime = new Date().toJSON();

    var requestBody = JSON.stringify(bodyJSON);

    return createAPI(apiAddress, requestBody)
        .then(response => {
            console.log(response);
            if (response.status !== 201) {
                throw("Server could not create the report. Make sure all fields are correct")
            }
        })
}

export function handleEntitySubmit(apiAddress, submitForm) {
    let bodyJSON = {};
    console.log("submit form", submitForm)
    Object.keys(submitForm).forEach((key) => {
        if (submitForm[key]) {
            bodyJSON[key] = getTransformedData(key, submitForm[key].value);
        }
    });


    var requestBody = JSON.stringify(bodyJSON);
    console.log("body", requestBody)
    return createAPI(apiAddress, requestBody)
        .then(response => {
            console.log(response);
            if (response.status !== 201) {
                throw ("Server could not create the entity. Make sure all fields are correct")
            }
        })
}

function getTransformedData(key, value) {
    var transformedData = value;
    if (key === "locations") {
        transformedData = value.split(/\s*/).map(function (item) {
            return parseInt(item, 10);
        });
        console.log("data", transformedData)
    }
    return transformedData;
}