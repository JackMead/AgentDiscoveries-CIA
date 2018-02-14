import * as React from "react";
import {
    Form,
    FormGroup,
    FormControl,
    Button,
    ControlLabel
} from "react-bootstrap";

import { Message } from "../message"
import { handleSubmit } from "./submit-utilities"

export default class RegionSummarySubmit extends React.Component {

    constructor() {
        super();
        this.state = {
            "submitForm": {},
            "message": {"message": "", "type": "danger"},
        }
    }


    render() {
        return (
            <div className="col-md-12">
                <Form onSubmit={this.onSubmit.bind(this)}>
                    <h3>Submit Region Summary</h3>

                    <Message message={this.state.message} />
                    
                    <FormGroup>
                        <ControlLabel>User ID</ControlLabel>
                        <FormControl type="text" required
                            inputRef={userId => this.state.submitForm.userId = userId}
                            placeholder="enter user ID" />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Region ID</ControlLabel>
                        <FormControl type="text" required
                            inputRef={regionId => this.state.submitForm.regionId = regionId}
                            placeholder="enter region ID" />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Status</ControlLabel>
                        <FormControl type="text" required
                            inputRef={status => this.state.submitForm.status = status}
                            placeholder="enter status"/>
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
        handleSubmit('/v1/api/reports/regionsummaries', this.state.submitForm)
            .then(response => {
                this.setState({"message": {"message": "Report sent", "type": "info"}})
            })
            .catch(error => {
                this.setState({"message": {"message": error, "type": "danger"}});
            })
    }
};
