import * as React from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  Button,
  ControlLabel
} from 'react-bootstrap';

export class AddAgent extends React.Component {
  constructor (props) {
    super();
    this.state = {
      users: props.entities.users,
      onSubmit: props.onSubmit
    };

    this.submitForm = props.submitForm;
    this.getUserOptions = this.getUserOptions.bind(this);
  }

  render (props) {
    return (
        <div className='col-md-12'>
          <Form onSubmit={this.state.onSubmit}>
            <h3>Create Agent</h3>

            <FormGroup>
              <ControlLabel>User</ControlLabel>
              <FormControl componentClass='select' required
                           inputRef={userId => { this.submitForm.userId = userId }}
                           placeholder='enter user ID'>
                {this.getUserOptions()}
              </FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>First Name</ControlLabel>
              <FormControl type='text' required
                           inputRef={firstName => { this.submitForm.firstName = firstName }}
                           placeholder='enter first name' />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Last Name</ControlLabel>
              <FormControl type='text' required
                           inputRef={lastName => { this.submitForm.lastName = lastName }}
                           placeholder='enter last name' />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Date Of Birth</ControlLabel>
              <FormControl type='date' required
                           inputRef={dateOfBirth => { this.submitForm.dateOfBirth = dateOfBirth }}
                           placeholder='enter date of birth' />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Rank</ControlLabel>
              <FormControl type='number' required
                           inputRef={rank => { this.submitForm.rank = rank }}
                           placeholder='enter rank (numeric)' />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Call Sign</ControlLabel>
              <FormControl type='text' required
                           inputRef={callSign => { this.submitForm.callSign = callSign }}
                           placeholder='enter call sign' />
            </FormGroup>
            <Button type='submit'>Submit</Button>
          </Form>
        </div>
    );
  }

  getUserOptions () {
    return Object.keys(this.state.users).map(key => {
      let user = this.state.users[key];
      return <option key={user.userId} value={user.userId}>{user.username}</option>;
    });
  }
}