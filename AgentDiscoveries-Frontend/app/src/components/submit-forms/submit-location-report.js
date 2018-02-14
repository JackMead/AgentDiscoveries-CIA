import * as React from "react";
import {
    Form,
    FormGroup,
    FormControl,
    Button,
    ControlLabel
} from "react-bootstrap";
import { handleSubmit } from "./submit-utilities"
import { Message } from "../message"

export default class LocationReportSubmit extends React.Component {

    constructor() {
        super();
        this.state = {
            "submitForm": {},
            "message": { "message": "", "type": "danger" },
        }
    }

    render() {
        return (
            <div className="col-md-12">
                <Form onSubmit={this.onSubmit.bind(this)}>
                    <h3>Submit Location Report</h3>

                    <Message message={this.state.message} />

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

    onSubmit(e) {
        e.preventDefault();
        handleSubmit('/v1/api/reports/locationstatuses', this.state.submitForm)
            .then(response => {
                this.setState({ "message": { "message": "Report sent", "type": "info" } })
            })
            .catch(error => {
                this.setState({ "message": { "message": error, "type": "danger" } });
            })
    }
};
