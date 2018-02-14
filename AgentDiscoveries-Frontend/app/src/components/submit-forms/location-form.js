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

export class CreateLocation extends React.Component {

    constructor(props) {
        super();
        this.state = {
            "submitForm": props.submitForm,
            "onSubmit": props.onSubmit,
            "message": ""
        }
    }

    render(props) {
        return (
            <div className="col-md-12">
                <Form onSubmit={this.state.onSubmit.bind(this)}>
                    <h3>Create Location</h3>

                    <Message message={this.state.message} />

                    <FormGroup>
                        <ControlLabel>Site Name</ControlLabel>
                        <FormControl type="text" required
                            inputRef={siteName => this.state.submitForm.siteName = siteName}
                            placeholder="enter agent ID" />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Location Name</ControlLabel>
                        <FormControl type="text" required
                            inputRef={location => this.state.submitForm.location = location}
                            placeholder="enter location ID" />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Time Zone</ControlLabel>
                        <FormControl type="text" required
                            inputRef={timeZone => this.state.submitForm.timeZone = timeZone}
                            placeholder="enter status"/>
                    </FormGroup>
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        );
    }
}
