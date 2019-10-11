import * as React from 'react';
import {Button, ButtonGroup, Form, FormControl, FormGroup} from 'react-bootstrap';
import {apiPut} from '../utilities/request-helper';
import {currentAgentId} from '../utilities/user-helper';
import Message from '../message';

export default class EditProfileCallSign extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            callSign: '',
            message: {}
        };

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render () {
        return (
            <div className='col-md-8 col-md-offset-2'>
                <Form onSubmit={this.handleSubmit}>

                    <h3>Change Call Sign</h3>

                    <Message message={this.state.message}/>

                    <FormGroup>
                        <FormControl type='text'
                            placeholder='Enter your new call sign'
                            value={this.state.callSign}
                            onChange={this.onChange}/>
                    </FormGroup>
                    <ButtonGroup>
                        <Button type='submit'>Submit</Button>
                    </ButtonGroup>
                </Form>
            </div>
        );
    }

    onChange(event) {
        this.setState({ callSign: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        const body = { callSign: this.state.callSign };
        apiPut('agents/editCallSign', body, currentAgentId())
            .then(() => { window.location.hash = '/profile'; })
            .catch(() => this.setState({ message: { message: 'Could not update Call Sign, please try again later', type: 'danger'} }));
    }
}
