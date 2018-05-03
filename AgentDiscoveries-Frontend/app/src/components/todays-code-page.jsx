import * as React from 'react';
import {Button, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';
import {apiPost} from './utilities/request-helper';

export default class TodaysCodePage extends React.Component {
    constructor () {
        super();

        this.state = {
            message: '',
            result: ''
        };

        this.onChange = this.onChange.bind(this);
        this.handleDecode = this.handleDecode.bind(this);
        this.handleEncode = this.handleEncode.bind(this);
        this.handleRequest = this.handleRequest.bind(this);
    }

    render() {
        return (
            <div className='col-md-8 col-md-offset-2'>
                <Form>

                    <h3>Encode/decode message with today's secret</h3>

                    <FormGroup>
                        <ControlLabel>Message</ControlLabel>
                        <FormControl type='text' required
                            id='message-input'
                            componentClass='textarea' rows={6}
                            placeholder='Enter message'
                            value={this.state.message}
                            onChange={this.onChange}/>
                    </FormGroup>

                    <Button id="encode-button" className='rm-3' type='submit' onClick={this.handleEncode}>Encode</Button>
                    <Button id="decode-button" type='submit' onClick={this.handleDecode}>Decode</Button>
                </Form>


                <div id="code-result">
                    {this.state.result ? <h3>Result</h3> : ''}
                    {this.state.result}
                </div>
            </div>

        );
    }

    onChange(event) {
        this.setState({ message: event.target.value });
    }

    handleEncode(event) {
        event.preventDefault();
        this.handleRequest('encodemessage');
    }

    handleDecode(event) {
        event.preventDefault();
        this.handleRequest('decodemessage');
    }

    handleRequest(api) {
        const body = { message: this.state.message };

        apiPost(api, body)
            .then(response => this.setState({ result: response.message }))
            .catch(error => this.setState({ result: error.message }));
    }
}
