import * as React from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  Button,
  ButtonGroup
} from 'react-bootstrap';
import { updateAPI } from '../crud';
import { getEntity } from '../utilities/get-utilities';

export default class EditProfileCallSign extends React.Component {
  constructor () {
    super();

    this.state = {
      agent: {}
    };
    this.handleCallSignUpdate = this.handleCallSignUpdate.bind(this);
    this.getAgent = this.getAgent.bind(this);
  }

  componentWillMount () {
    this.getAgent();
  }

  render () {
    return (
      <div className='col-md-8 col-md-offset-2'>
        <Form onSubmit={this.handleCallSignUpdate}>

          <h3>Change Call Sign</h3>

          <FormGroup>
            <FormControl type='text' inputRef={callSign => { this.newCallSign = callSign }}
              placeholder='enter your call sign' />
          </FormGroup>
          <ButtonGroup>
            <Button type='submit'>Submit</Button>
          </ButtonGroup>
        </Form>
      </div>
    );
  }

  handleCallSignUpdate (e) {
    e.preventDefault();
    const userId = window.localStorage.getItem('UserId');
    const requestBodyJSON = {
      callSign: this.newCallSign.value
    };
    updateAPI('v1/api/agents', userId, JSON.stringify(requestBodyJSON))
      .then(response => {
        window.location.hash = '/profile';
      })
      .catch(error => {
        console.log(error);
      });
  }

  getAgent () {
    const userId = window.localStorage.getItem('UserId');
    getEntity('agents', userId)
      .then(response => {
        this.setState({
          agent: response
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
};
