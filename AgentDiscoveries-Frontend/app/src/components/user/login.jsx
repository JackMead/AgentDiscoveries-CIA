import * as React from 'react';
import {Button, Form, FormControl, FormGroup} from 'react-bootstrap';
import Message from '../message';
import * as UserHelper from '../utilities/user-helper';

export default class Login extends React.Component {
    constructor () {
        super();

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
            </div>
        );
    }

    componentWillMount () {
        if (UserHelper.isLoggedIn()) {
            window.location.hash = '#/message';
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
                // TODO: What is this event used for?
                window.dispatchEvent(new Event('login'));
                window.location.hash = '#/';
            })
            .catch(error => {
                this.setState({ message: { message: error.message, type: 'danger' } });
            });
    }
}
