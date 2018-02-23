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
        this.state = {
            authenticationMessage: "",
            isLoggedInMessage: "",
        }
    }

    componentDidMount() {
        this.updateIsLoggedIn();
    }

    render() {
        return (
            <div>
                <div>{this.state.isLoggedInMessage}</div>
                <Button onClick={this.logOut.bind(this)}>Log out</Button>
                
                <Form onSubmit={this.handleLogIn.bind(this)}>
                    <h3>Sign in</h3>
                    <ControlLabel bsStyle="warning">{this.state.authenticationMessage}</ControlLabel> 
                    <FormGroup>
                        <FormControl type="text" inputRef={username => this.username = username} placeholder="enter your username" />
                        <FormControl type="password" inputRef={password => this.password = password} placeholder="enter password" />
                        <Button type="submit">Login</Button><Button onClick={this.handleRegister.bind(this)}>Register</Button>
                    </FormGroup>
                </Form>
            </div>
        );
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
                let userId = response.userId;
                window.localStorage.setItem("Token", token);
                window.localStorage.setItem("UserId", userId);
                this.updateIsLoggedIn();
                if (!response.errorCode){
                    this.setState({authenticationMessage: "Signed in successfully"});
                } else {
                    this.setState({authenticationMessage: response.message});
                }
            })
            .catch(err => {
                this.setState({ authenticationMessage: err });
            });
    }

    handleRegister(e) {
        e.preventDefault();
        var requestBodyJSON = {
            "username": this.username.value,
            "password": this.password.value
        }

        this.makeAuthenticationAPICall("/v1/makeuser", requestBodyJSON)
            .then(response => response.json())
            .then(response => {
                const token = response.token;
                window.localStorage.setItem("Token", token);
                if (!response.errorCode) {
                    this.updateIsLoggedIn();
                    this.setState({authenticationMessage: `User ${response.username} created successfully`});
                } else {
                    console.log(response)
                    this.setState({ authenticationMessage: response.message });
                }
            })
            .catch(err => {
                this.setState({ authenticationMessage: err });
            });
    }

    makeAuthenticationAPICall(apiAddress, requestBodyJSON) {
        var requestBody = JSON.stringify(requestBodyJSON);
        return fetch(apiAddress, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: requestBody
        });
    }

    isUserLoggedIn(){
        const token = window.localStorage.getItem("Token");
        return token && true;
    }

    updateIsLoggedIn() {

        var isLoggedIn = this.isUserLoggedIn();
        
        this.setState({ isLoggedIn: isLoggedIn,
            isLoggedInMessage: this.getIsLoggedInMessage(isLoggedIn) });
    }

    getIsLoggedInMessage(isLoggedIn) {
        var isLoggedInMessage = isLoggedIn ? "User is logged in" : "User is not logged in";
        return isLoggedInMessage;
    }

    logOut() {
        window.localStorage.clear("Token");
        this.updateIsLoggedIn();
    }
};
