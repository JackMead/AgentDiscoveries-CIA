import * as React from "react";
import {
    Form,
    FormGroup,
    FormControl,
    Button,
    ControlLabel
} from "react-bootstrap";
import { handleSubmit } from "./submit-utilities"

export class CreateLocation extends React.Component {

    constructor(props) {
        super();
        this.state = {
            "submitForm": props.submitForm,
            "onSubmit": props.onSubmit
        }
    }

    render(props) {
        return (
            <div className="col-md-12">
                <Form onSubmit={this.state.onSubmit}>
                    <h3>Create Location</h3>

                    <FormGroup>
                        <ControlLabel>Site Name</ControlLabel>
                        <FormControl type="text" required
                            inputRef={siteName => this.state.submitForm.siteName = siteName}
                            placeholder="enter site name" />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Location Name</ControlLabel>
                        <FormControl type="text" required
                            inputRef={location => this.state.submitForm.location = location}
                            placeholder="enter location name" />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Time Zone</ControlLabel>
                        <FormControl type="text" required
                            inputRef={timeZone => this.state.submitForm.timeZone = timeZone}
                            placeholder="enter time zone (e.g. GMT+1)"/>
                    </FormGroup>
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        );
    }
}
