import * as React from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  Button,
  Checkbox
} from 'react-bootstrap';

export class EditUser extends React.Component {
  constructor (props) {
    super();
    this.state = {
      onSubmit: props.onSubmit,
      id: props.id,
      entity: props.entity
    };

    this.submitForm = props.submitForm;
  }

  render (props) {
    return (
      <div className='col-md-12'>
        <Form onSubmit={this.state.onSubmit}>
          <h3>Edit User</h3>

          <FormGroup>
            <FormControl type='text' required
              defaultValue={this.state.entity.username}
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
