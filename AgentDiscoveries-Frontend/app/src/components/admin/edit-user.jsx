import * as React from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  Button,
  Checkbox
} from 'react-bootstrap';

export class EditUser extends React.Component {
  constructor(props) {
    super();

    // TODO: props modifications
    this.submitForm = props.submitForm;
  }

  render() {
    return (
      <div className='col-md-12'>
        <Form onSubmit={this.props.onSubmit}>
          <h3>Edit User</h3>

          <FormGroup>
            <FormControl type='text' required
              defaultValue={this.props.entity.username}
              inputRef={username => { this.submitForm.username = username }}
              placeholder='enter username' />
          </FormGroup>
          <FormGroup>
            <FormControl type='password'
              inputRef={password => { this.submitForm.password = password }}
              placeholder='enter password' />
          </FormGroup>
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
}
