import * as React from "react";
import {
    Form,
    FormGroup,
    FormControl,
    Button,
    ControlLabel
} from "react-bootstrap";
import * as CRUD from "../crud"

export default class LocationReportSubmit extends React.Component {

    constructor() {
        super();
        this.state = {
            "submitForm": {}
        }
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <h3>Submit Location Report</h3>

                    <FormGroup>
                        <ControlLabel>Agent ID</ControlLabel>
                        <FormControl type="text" required
                            inputRef={agentId => this.state.submitForm.agentId = agentId}
                            placeholder="enter agent ID" />

                        <ControlLabel>Location ID</ControlLabel>
                        <FormControl type="text" required
                            inputRef={locationId => this.state.submitForm.locationId = locationId}
                            placeholder="enter location ID" />
                        
                        <ControlLabel>Status</ControlLabel>
                        <FormControl type="text" required
                            inputRef={status => this.state.submitForm.status = status}
                            placeholder="enter status"/>
                        
                        <ControlLabel>Report</ControlLabel>
                        <FormControl type="text" required
                            componentClass="textarea" rows={6}
                            inputRef={reportBody => this.state.submitForm.reportBody = reportBody}
                            placeholder="write report" />

                        <Button type="submit">Submit</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        

        let bodyJSON = {};
        Object.keys(this.state.submitForm).forEach((key) => {
            bodyJSON[key] = this.state.submitForm[key].value;
        });

        bodyJSON.reportTime = new Date().toJSON();

        var requestBody = JSON.stringify(bodyJSON);

        CRUD.createAPI("/v1/api/reports/locationstatuses", requestBody)
            .then(response => response.json())
            .then(response => console.log(response))
    }

    makeSubmitApiCall(apiAddress, requestBody) {
        var tokenHeader = "Bearer " + window.localStorage.getItem("Token");
        
        console.log(requestBody);
        return fetch(apiAddress, {
            method: 'Post',
            headers: {
                'Authorization': tokenHeader,
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            "body": requestBody
        });
    }
};