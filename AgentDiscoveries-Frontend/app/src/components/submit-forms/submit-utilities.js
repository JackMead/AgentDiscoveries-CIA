import { createAPI } from "../crud"

export function handleSubmit(apiAddress, submitForm) {
    let bodyJSON = {};
    Object.keys(submitForm).forEach((key) => {
        bodyJSON[key] = submitForm[key].value;
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