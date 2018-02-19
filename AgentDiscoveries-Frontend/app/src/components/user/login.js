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
            authenticationMessage: { "message": "", "type": "info"}
        }
    }

    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <Form onSubmit={this.handleLogIn.bind(this)}>
                    <h3>Sign in</h3>
                    <Message message={this.state.authenticationMessage} />
                    <FormGroup>
                        <FormControl type="text" inputRef={username => this.state.username = username} placeholder="enter your username" />
                    </FormGroup>
                    <FormGroup>
                        <FormControl type="password" inputRef={password => this.state.password = password} placeholder="enter password" />
                    </FormGroup>
                    <FormGroup>
                        <Button id="login-submit" className="button-inline" type="submit">Login</Button>
                        <Button className="button-inline" onClick={this.handleRegister.bind(this)}>Register</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }

    componentWillMount() {
        if (UserUtils.isLoggedIn()) {
            window.location.hash = "#/search/location";
        }
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
                    console.log(response)
                    if (response.status === 401) {
                        throw "Incorrect username or password";
                    } else {
                        throw "Server error. Server cannot process the request";
                    }
                }
            })
            .then(response => {
                let token = response.token;
                window.localStorage.setItem("Token", token);
                window.dispatchEvent(new Event("login"));
                window.location.hash = "#/";
            })
            .catch(err => {
                this.setState({ authenticationMessage: {"message": err, "type": "danger"} });
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
                    document.getElementById("login-submit").click(); // log in with the newly registered account
                    return response.json()
                } else {
                    if (response.status === 500) {
                        throw "This username is already taken";
                    } else {
                        throw "Server error. Server cannot process the request";
                    }
                }
            })
            .catch(err => {
                this.setState({ authenticationMessage: {"message": err, "type": "danger"} });
            });
    }
};
