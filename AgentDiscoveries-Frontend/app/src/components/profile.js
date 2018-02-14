import * as React from "react";
import {
    Form,
    FormGroup,
    FormControl,
    Button,
    ControlLabel
} from "react-bootstrap";
import {updateAPI} from "./crud";

export default class Profile extends React.Component {

    constructor() {
        super();
        this.state = {
            serverMessage: "",
            codename: "",
        }
    }

    render() {
        if (!this.isUserLoggedIn()) {
            return null;
        }
        return (
            <div>
                <Form onSubmit={this.handleProfileUpdate.bind(this)}>
                    <h3>Update Details</h3>
                    <ControlLabel bsStyle="warning">{this.state.serverMessage}</ControlLabel>
                    <FormGroup>
                        <FormControl name="codename" type="text" inputRef={codename => this.codename = codename}
                                     placeholder="codename?"/>
                        <Button type="submit">Update</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }

    handleProfileUpdate(e) {
        e.preventDefault();
        var agentId=1;
        var requestBodyJSON = {
            "id":agentId,
            "callsign": this.codename.value
        };

        updateAPI("/v1/api/agents", id, JSON.stringify(requestBodyJSON))
    }

    isUserLoggedIn() {
        let token = window.localStorage.getItem("Token");
        return token && true;
    }
};