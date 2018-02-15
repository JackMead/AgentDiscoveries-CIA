import * as React from "react";
import {
    Form,
    FormGroup,
    FormControl,
    Button,
    ControlLabel
} from "react-bootstrap";

import { Message } from "../message"
import { handleReportSubmit } from "./submit-utilities"
import { searchAPI } from "../crud"

export default class RegionSummarySubmit extends React.Component {

    constructor() {
        super();
        this.state = {
            "submitForm": {},
            "regions": [],
            "users": [],
            "message": {"message": "", "type": "danger"},
        }

        searchAPI("v1/api/regions", "")
            .then(response => response.json())
            .then(response => this.setState({ "regions": response }))

        searchAPI("v1/api/users", "")
            .then(response => response.json())
            .then(response => this.setState({ "users": response }))
    }


    render() {
        return (
            <div>
                <Form className="col-md-8 col-md-offset-2" onSubmit={this.onSubmit.bind(this)}>

                    <h3>Submit Region Summary</h3>

                    <Message message={this.state.message} />
                    
                    <FormGroup>
                        <ControlLabel>User</ControlLabel>
                        <FormControl componentClass="select" required
                            inputRef={userId => this.state.submitForm.userId = userId}
                            placeholder="enter user ID">
                            {this.getUserOptions.bind(this)()}
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Region</ControlLabel>
                        <FormControl componentClass="select" required
                            inputRef={regionId => this.state.submitForm.regionId = regionId}
                            placeholder="enter region ID">
                            {this.getRegionOptions.bind(this)()}
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Status</ControlLabel>
                        <FormControl type="number" required
                            inputRef={status => this.state.submitForm.status = status}
                            placeholder="enter status (numeric)"/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Summary</ControlLabel>
                        <FormControl type="text" required
                            componentClass="textarea" rows={6}
                            inputRef={reportBody => this.state.submitForm.reportBody = reportBody}
                            placeholder="write region summary" />
                    </FormGroup>
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        );
    }

    onSubmit(e) {
        e.preventDefault();
        handleReportSubmit('/v1/api/reports/regionsummaries', this.state.submitForm)
            .then(response => {
                this.setState({"message": {"message": "Report sent", "type": "info"}})
            })
            .catch(error => {
                this.setState({"message": {"message": error, "type": "danger"}});
            })
    }

    getUserOptions() {
        return Object.keys(this.state.users).map(key => {
            let user = this.state.users[key];
            return <option key={user.userId} value={user.userId}>{user.username}</option>
        })
    }

    getRegionOptions() {
        return Object.keys(this.state.regions).map(key => {
            let region = this.state.regions[key];
            return <option key={region.regionId} value={region.regionId}>{region.name} (id: {region.regionId})</option>
        })
    }
};
