import * as React from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from 'react-bootstrap';
import { createAPI } from './crud';

export default class TodaysCodePage extends React.Component {
  constructor () {
    super();
    this.state = {
      'message': {},
      'result': ''
    };

    this.handleDecode = this.handleDecode.bind(this);
    this.handleEncode = this.handleEncode.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
  }

  render (props) {
    return (
      <div className='col-md-8 col-md-offset-2'>
        <Form>

          <h3>Encode/decode message with today's secret</h3>


          <FormGroup>
            <ControlLabel>Message</ControlLabel>
            <FormControl type='text' required
              componentClass='textarea' rows={6}
              inputRef={message => { this.state.message.message = message }}
              placeholder='enter message'
              id="message-input"/>
          </FormGroup>

          <Button id="encode-button" className='rm-3' type='submit' onClick={this.handleEncode}>Encode</Button>
          <Button id="decode-button" type='submit' onClick={this.handleDecode}>Decode</Button>
        </Form>


        <div id="code-result">
          {this.state.result !== '' ? <h3> Result </h3> : ''}
          {this.state.result}
        </div>
      </div>

    );
  }

  handleEncode (e) {
    e.preventDefault();
    this.handleRequest('v1/api/encodemessage');
  }
  handleDecode (e) {
    e.preventDefault();
    this.handleRequest('v1/api/decodemessage');
  }

  handleRequest (api) {
    const requestJSON = { 'message': this.state.message.message.value };
    createAPI(api, JSON.stringify(requestJSON))
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw Error('Server cannot process the request');
        }
      })
      .then(response => this.setState({ result: response.message }))
      .catch(error => this.setState({ result: error.message }));
  }
}
