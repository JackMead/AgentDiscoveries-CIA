import * as React from "react";
import {
    Form,
    FormGroup,
    FormControl,
    Button,
    ControlLabel
} from "react-bootstrap";
import {Message} from "../message"
import * as UserUtils from "./user-utilities"
import {logIn} from "./user-utilities";

export default class Login extends React.Component {

    constructor(props) {
        super();
        this.state = {
            authenticationMessage: {message: "", type: "info"}
        }

        this.handleLogIn = this.handleLogIn.bind(this);
    }

    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <Form onSubmit={this.handleLogIn}>
                    <h3>Sign in</h3>
                    <Message message={this.state.authenticationMessage}/>
                    <FormGroup>
                        <FormControl type="text" inputRef={username => this.username = username}
                                     placeholder="enter your username"/>
                    </FormGroup>
                    <FormGroup>
                        <FormControl type="password" inputRef={password => this.password = password}
                                     placeholder="enter password"/>
                    </FormGroup>
                    <FormGroup>
                        <Button id="login-submit" type="submit">Login</Button>
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
            username: this.username.value,
            password: this.password.value
        }

        UserUtils.makeAuthenticationAPICall("/v1/token", requestBodyJSON)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    if (response.status === 401) {
                        throw "Incorrect username or password";
                    } else {
                        throw "Server error. Server cannot process the request";
                    }
                }
            })
            .then(response => {
                let token = response.token;
                let userId = response.userId;
                logIn(token, userId);
                window.dispatchEvent(new Event("login"));
                window.location.hash = "#/";
            })
            .catch(err => {
                this.setState({authenticationMessage: {message: err, type: "danger"}});
            });
    }
};
