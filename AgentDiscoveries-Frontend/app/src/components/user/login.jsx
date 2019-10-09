import * as React from 'react';
import {Button, Form, FormControl, FormGroup} from 'react-bootstrap';
import Message from '../message';
import * as UserHelper from '../utilities/user-helper';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            message: { message: '', type: 'info' }
        };

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.handleLogIn = this.handleLogIn.bind(this);
    }

    render () {
        return (
            <div className='col-md-6 col-md-offset-3'>
                <Message message={this.state.message} />
                <Form onSubmit={this.handleLogIn}>
                    <h3>Sign in</h3>
                    <FormGroup>
                        <FormControl id="user-name-input" type='text' placeholder='Enter your username'
                            value={this.state.username} onChange={this.onUsernameChange}/>
                    </FormGroup>
                    <FormGroup>
                        <FormControl id="password-input" type='password' placeholder='Enter password'
                            value={this.state.password} onChange={this.onPasswordChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Button id='login-submit' type='submit'>Login</Button>
                    </FormGroup>
                </Form>
                <h1>
                    <ol>
                        FOR THE LOVE OF GOD, MAKE SURE YOU'VE DONE
                        <li>MVN CLEAN PACKAGE</li>
                        <li>YOU'RE RUNNING IT IN INTELLIJ (AGENT DISCOVERIES APPLICATION)</li>
                        <li><i>AND </i></li>
                        <li>YOU HAVE THE -DDEV SERVER RUNNING TOO.</li>
                        <li>AAAAAAAAAAAAA OH MY GOD!!!!!!!!!!!!!!!</li>
                        <li>A N D YOU NEED TO HAVE AN ACTUAL DATABASE PREPARED ON SQL</li>
                    </ol>
                </h1>
            </div>
        );
    }

    componentWillMount () {
        if (UserHelper.isLoggedIn()) {
            window.location.hash = '#/';
        }
    }

    onUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    onPasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    handleLogIn(event) {
        event.preventDefault();

        const body = {
            username: this.state.username,
            password: this.state.password
        };

        fetch('/v1/token', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    if (response.status === 401) {
                        throw new Error('Incorrect username or password');
                    } else {
                        throw new Error('Server error. Server cannot process the request');
                    }
                }
            })
            .then(response => {
                UserHelper.storeUserInfo(response);
                window.location.hash = '#/welcome';
            })
            .catch(error => {
                this.setState({ message: { message: error.message, type: 'danger' } });
            });
    }
}
