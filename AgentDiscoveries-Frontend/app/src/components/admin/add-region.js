import * as React from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  Button,
  ControlLabel
} from 'react-bootstrap';

export class AddRegion extends React.Component {
  constructor (props) {
    super();
    this.state = {
      onSubmit: props.onSubmit
    };

    this.submitForm = props.submitForm;
  }

  render (props) {
    return (
      <div className='col-md-12'>
        <Form onSubmit={this.state.onSubmit}>
          <h3>Create Region</h3>

          <FormGroup>
            <ControlLabel>Region Name</ControlLabel>
            <FormControl type='text' required
              inputRef={name => { this.submitForm.name = name }}
              placeholder='enter region name' />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Location IDs</ControlLabel>
            <FormControl type='text' required
              inputRef={locations => { this.submitForm.locations = locations }}
              placeholder='enter location IDs (separated by white space)' />
          </FormGroup>
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    );
  }
}
