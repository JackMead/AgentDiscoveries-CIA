import { createAPI } from "../crud"

export function handleSubmit(apiAddress, submitForm) {
    let bodyJSON = {};
    Object.keys(submitForm).forEach((key) => {
        bodyJSON[key] = submitForm[key].value;
    });

    bodyJSON.reportTime = new Date().toJSON();

    var requestBody = JSON.stringify(bodyJSON);

    createAPI(apiAddress, requestBody)
        .then(response => response.json())
        .then(response => console.log(response))
}