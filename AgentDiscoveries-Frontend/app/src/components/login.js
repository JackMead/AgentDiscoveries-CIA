import * as React from "react";
import {
    Form,
    FormGroup,
    FormControl,
    Button,
    ControlLabel
} from "react-bootstrap";

export default class Login extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Button onClick={this.logOut}>Log out</Button>
                
                <Form inline onSubmit={this.handleLogIn.bind(this)}>
                    <ControlLabel>{this.isLoggedInMessage()}</ControlLabel>
                    <h3>Sign in</h3>
                    <FormGroup>
                        <FormControl type="text" inputRef={username => this.username = username} placeholder="enter you username" />
                        <FormControl type="password" inputRef={password => this.password = password} placeholder="enter password" />
                        <Button type="submit">Login</Button> <Button onClick={this.handleRegister.bind(this)}>Register</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }

    isLoggedIn() {
        let token = window.localStorage.getItem("Token");
        if (token) return true;
        return false;
    }

    handleLogIn(e) {
        e.preventDefault();
        var requestBodyJSON = {
            "username": this.username.value,
            "password": this.password.value
        }

        this.makeAuthenticationAPICall("/v1/token", requestBodyJSON)
            .then(response => response.json())
            .then(response => {
                let token = response.token;
                window.localStorage.setItem("Token", token);
                location.reload();
            });

    }

    handleRegister(e) {
        e.preventDefault();
        var requestBodyJSON = {
            "username": this.username.value,
            "password": this.password.value
        }

        this.makeAuthenticationAPICall("/v1/makeuser", requestBodyJSON)
            .then(response => {
                if (response.status === 200) {
                    return Promise.resolve("Debug: Response", response.json())
                } else {
                    return Promise.reject(response.status, response.json)
                }
            })
            .then(alert("User created successfully"))
            .catch((status, error) => console.log(status, error));
    }

    makeAuthenticationAPICall(apiAddress, requestBodyJSON) {
        console.log(requestBodyJSON)
        var requestBody = JSON.stringify(requestBodyJSON);
        console.log(requestBody)
        return fetch(apiAddress, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: requestBody
        });
    }

    isLoggedInMessage() {
        if (this.isLoggedIn()) {
            return (
                <p> User is logged in </p>
            )
        }
        return <p> The user <strong>is not</strong> logged in </p>
    }

    logOut() {
        window.localStorage.clear("Token");
        location.reload();
    }
};