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

export class CreateAgent extends React.Component {

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
                    <h3>Create Agent</h3>

                    <FormGroup>
                        <ControlLabel>First Name</ControlLabel>
                        <FormControl type="text" required
                            inputRef={firstName => this.state.submitForm.firstName = firstName}
                            placeholder="enter first name" />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Last Name</ControlLabel>
                        <FormControl type="text" required
                            inputRef={lastName => this.state.submitForm.lastName = lastName}
                            placeholder="enter last name" />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Date Of Birth</ControlLabel>
                        <FormControl type="date" required
                            inputRef={dateOfBirth => this.state.submitForm.dateOfBirth = dateOfBirth}
                            placeholder="enter date of birth" />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Rank</ControlLabel>
                        <FormControl type="number" required
                            inputRef={rank => this.state.submitForm.rank = rank}
                            placeholder="enter rank (numeric)" />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Call Sign</ControlLabel>
                        <FormControl type="text" required
                            inputRef={callSign => this.state.submitForm.callSign = callSign}
                            placeholder="enter call sign" />
                    </FormGroup>
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        );
    }
}
