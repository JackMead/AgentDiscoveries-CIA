import * as React from "react";
import {
    Form,
    FormGroup,
    FormControl,
    Button,
    ControlLabel
} from "react-bootstrap";
import { handleReportSubmit } from "./submit-utilities"
import { Message } from "../message"
import { searchAPI } from "../crud"

export default class LocationReportSubmit extends React.Component {

    constructor() {
        super();
        this.state = {
            "submitForm": {},
            "locations": [],
            "agents": [],
            "message": { "message": "", "type": "danger" },
        }

        searchAPI("v1/api/agents", "")
            .then(response => response.json())
            .then(response => this.setState({ "agents": response }))

        searchAPI("v1/api/locations", "")
            .then(response => response.json())
            .then(response => this.setState({ "locations": response }))
    }


    render() {
        return (
            <div className="col-md-8 col-md-offset-2">
                <Form onSubmit={this.onSubmit.bind(this)}>
                    <h3>Submit Location Report</h3>

                    <Message message={this.state.message} />

                    <FormGroup>
                        <ControlLabel>Agent</ControlLabel>
                        <FormControl componentClass="select" required
                            inputRef={agent => this.state.submitForm.agentId = agent}
                            placeholder="enter agent ID">
                            {this.getAgentOptions.bind(this)()}
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Location</ControlLabel>
                        <FormControl componentClass="select" required
                            inputRef={location => this.state.submitForm.locationId = location}
                            placeholder="enter location ID">
                            {this.getLocationOptions.bind(this)()}
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Status</ControlLabel>
                        <FormControl type="number" required
                            inputRef={status => this.state.submitForm.status = status}
                            placeholder="enter status (numeric)"/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Report</ControlLabel>
                        <FormControl type="text" required
                            componentClass="textarea" rows={6}
                            inputRef={reportBody => this.state.submitForm.reportBody = reportBody}
                            placeholder="write report" />
                    </FormGroup>
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        );
    }

    onSubmit(e) {
        e.preventDefault();
        handleReportSubmit('/v1/api/reports/locationstatuses', this.state.submitForm)
            .then(response => {
                this.setState({ "message": { "message": "Report sent", "type": "info" } })
            })
            .catch(error => {
                this.setState({ "message": { "message": error, "type": "danger" } });
            })
    }

    getLocationOptions() {
        return Object.keys(this.state.locations).map(key => {
            let location = this.state.locations[key];
            return <option key={location.locationId} value={location.locationId}>{location.location}, {location.siteName}</option>
        })
    }

    getAgentOptions() {
        return Object.keys(this.state.agents).map(key => {
            let agent = this.state.agents[key];
            return <option key={agent.agentId} value={agent.agentId}>{agent.firstName} {agent.lastName} ({agent.callSign})</option>
        })
    }
};
