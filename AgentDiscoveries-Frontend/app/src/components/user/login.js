import * as React from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  Button
} from 'react-bootstrap';
import Message from '../message';
import * as UserUtils from './user-utilities';

export default class Login extends React.Component {
  constructor () {
    super();
    this.state = {
      message: { message: '', type: 'info' }
    };

    this.handleLogIn = this.handleLogIn.bind(this);
  }

  render () {
    return (
      <div className='col-md-6 col-md-offset-3'>
        <Message message={this.state.message} />
        <Form onSubmit={this.handleLogIn}>
          <h3>Sign in</h3>
          <FormGroup>
            <FormControl id="user-name-input" type='text' inputRef={username => { this.username = username }} placeholder='enter your username' />
          </FormGroup>
          <FormGroup>
            <FormControl id="password-input" type='password' inputRef={password => { this.password = password }} placeholder='enter password' />
          </FormGroup>
          <FormGroup>
            <Button id='login-submit' type='submit'>Login</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }

  componentWillMount () {
    if (UserUtils.isLoggedIn()) {
      window.location.hash = '#/message';
    }
  }

  handleLogIn (e) {
    e.preventDefault();
    let requestBodyJSON = {
      username: this.username.value,
      password: this.password.value
    };

    UserUtils.makeAuthenticationAPICall('/v1/token', requestBodyJSON)
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
        UserUtils.logIn(response);
        window.dispatchEvent(new Event('login'));
        window.location.hash = '#/';
      })
      .catch(error => {
        this.setState({ message: { message: error.message, type: 'danger' } });
      });
  }
}
