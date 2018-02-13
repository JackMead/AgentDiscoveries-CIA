import * as React from "react";
import {
    Form,
    FormGroup,
    FormControl,
    Button,
    ControlLabel
} from "react-bootstrap";
import { handleSubmit } from "./submit-utilities"

export default class RegionSummarySubmit extends React.Component {

    constructor() {
        super();
        this.state = {
            "submitForm": {}
        }
    }

    render() {
        return (
            <div className="col-md-12">
                <Form onSubmit={this.onSubmit.bind(this)}>
                    <h3>Submit Summary</h3>

                    <FormGroup>
                        <ControlLabel>User ID</ControlLabel>
                        <FormControl type="text" required
                            inputRef={userId => this.state.submitForm.userId = userId}
                            placeholder="enter user ID" />

                        <ControlLabel>Region ID</ControlLabel>
                        <FormControl type="text" required
                            inputRef={regionId => this.state.submitForm.regionId = regionId}
                            placeholder="enter region ID" />
                        
                        <ControlLabel>Status</ControlLabel>
                        <FormControl type="text" required
                            inputRef={status => this.state.submitForm.status = status}
                            placeholder="enter status"/>
                        
                        <ControlLabel>Summary</ControlLabel>
                        <FormControl type="text" required
                            componentClass="textarea" rows={6}
                            inputRef={reportBody => this.state.submitForm.reportBody = reportBody}
                            placeholder="write region summary" />

                        <Button type="submit">Submit</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }

    onSubmit(e) {
        e.preventDefault();
        handleSubmit('/v1/api/reports/regionsummaries', this.state.submitForm)
    }
};
