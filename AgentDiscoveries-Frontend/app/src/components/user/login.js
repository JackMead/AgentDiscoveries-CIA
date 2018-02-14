import * as React from "react";
import {
    Form,
    FormGroup,
    FormControl,
    Button,
    ControlLabel
} from "react-bootstrap";
import { Message } from "../message"
import * as UserUtils from "./user-utilities"
import * as CRUD from "../crud"

export default class Login extends React.Component {

    constructor(props) {
        super();
        this.state = {
            authenticationMessage: {"message": "", "type": "error"}
        }
    }
    render() {
        return (
            <div>
                <Form onSubmit={this.handleLogIn.bind(this)}>
                    <h3>Sign in</h3>
                    <Message message={this.state.authenticationMessage} />
                    <FormGroup>
                        <FormControl type="text" inputRef={username => this.state.username = username} placeholder="enter your username" />
                        <FormControl type="password" inputRef={password => this.state.password = password} placeholder="enter password" />
                        <Button type="submit">Login</Button><Button onClick={this.handleRegister.bind(this)}>Register</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }

    

    handleLogIn(e) {
        e.preventDefault();
        var requestBodyJSON = {
            "username": this.state.username.value,
            "password": this.state.password.value
        }

        UserUtils.makeAuthenticationAPICall("/v1/token", requestBodyJSON)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw "Authentication error. Could not authenticate the user";
                }
            })
            .then(response => {
                let token = response.token;
                window.localStorage.setItem("Token", token);
                this.setState({authenticationMessage: {"message": `Signed in successfully as ${this.state.username.value}`, "type": "info"} });
                window.dispatchEvent(new CustomEvent('login'));
            })
            .catch(err => {
                this.setState({ authenticationMessage: {"message": err, "type": "error"} });
            });
    }

    handleRegister(e) {
        e.preventDefault();
        var requestBodyJSON = {
            "username": this.state.username.value,
            "password": this.state.password.value
        }

        UserUtils.makeAuthenticationAPICall("/v1/makeuser", requestBodyJSON)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw "Registration error. Try using a different username";
                }
            })
            .then(response => {
                this.setState({authenticationMessage: {"message": `User ${response.username} created successfully`}, "type": "info"} );
            })
            .catch(err => {
                this.setState({ authenticationMessage: {"message": err, "type": "error"} });
            });
    }
};
