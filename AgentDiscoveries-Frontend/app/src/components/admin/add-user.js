import * as React from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  Button,
  ControlLabel,
  Checkbox
} from 'react-bootstrap';

export class AddUser extends React.Component {
  constructor (props) {
    super();
    this.state = {
      onSubmit: props.onSubmit,
      additionalAgentInfo: ''
    };

    this.submitForm = props.submitForm;
    this.submitForm.agentForm = {};

    this.onChange = this.onChange.bind(this);
    this.getOptionalAgentForm = this.getOptionalAgentForm.bind(this);
  }

  render (props) {
    return (
      <div className='col-md-12'>
        <Form onSubmit={this.state.onSubmit}>
          <h3>Create User</h3>
          <FormGroup>
            <FormControl type='text' required
              inputRef={username => { this.submitForm.username = username }}
              placeholder='enter username' />
          </FormGroup>
          <FormGroup>
            <FormControl type='password' required
              inputRef={password => { this.submitForm.password = password }}
              placeholder='enter password' />
          </FormGroup>
          <FormGroup>
            <Checkbox type='checkbox'
              onChange={this.onChange}
              inputRef={agent => { this.submitForm.agent = agent }} >
                Agent
            </Checkbox>
          </FormGroup>

          {this.state.additionalAgentInfo}

          <FormGroup>
            <Checkbox type='checkbox'
              onChange={this.onChange}
              inputRef={admin => { this.submitForm.admin = admin }} >
              Admin
            </Checkbox>
          </FormGroup>
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    );
  }

  onChange (e) {
    const additionalAgentInfo = this.submitForm.agent.checked ? this.getOptionalAgentForm() : '';

    this.setState({
      additionalAgentInfo: additionalAgentInfo
    });
  }

  getOptionalAgentForm () {
    return (
      <div className='ml-3'>
        <FormGroup>
          <ControlLabel>First Name</ControlLabel>
          <FormControl type='text' required
            inputRef={firstName => { this.submitForm.agentForm.firstName = firstName }}
            placeholder='enter first name' />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Last Name</ControlLabel>
          <FormControl type='text' required
            inputRef={lastName => { this.submitForm.agentForm.lastName = lastName }}
            placeholder='enter last name' />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Date Of Birth</ControlLabel>
          <FormControl type='date' required
            inputRef={dateOfBirth => { this.submitForm.agentForm.dateOfBirth = dateOfBirth }}
            placeholder='enter date of birth' />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Rank</ControlLabel>
          <FormControl type='number' required
            inputRef={rank => { this.submitForm.agentForm.rank = rank }}
            placeholder='enter rank (numeric)' />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Call Sign</ControlLabel>
          <FormControl type='text' required
            inputRef={callSign => { this.submitForm.agentForm.callSign = callSign }}
            placeholder='enter call sign' />
        </FormGroup>
      </div>
    );
  }
}
