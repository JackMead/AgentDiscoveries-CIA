import * as React from 'react';
import {Button, ButtonGroup, Form, FormControl, FormGroup} from 'react-bootstrap';
import {apiGet, apiPut} from '../utilities/request-helper';

// TODO: should newCallSign be state?
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
                        <FormControl type='text' inputRef={callSign => { this.newCallSign = callSign; }}
                            placeholder='enter your call sign' />
                    </FormGroup>
                    <ButtonGroup>
                        <Button type='submit'>Submit</Button>
                    </ButtonGroup>
                </Form>
            </div>
        );
    }

    handleCallSignUpdate (event) {
        event.preventDefault();

        const userId = window.localStorage.getItem('UserId');
        const body = { callSign: this.newCallSign.value };
        apiPut('agents', body, userId)
            .then(response => {
                window.location.hash = '/profile';
            })
            .catch(error => {
                console.log(error);
            });
    }

    getAgent () {
        const userId = window.localStorage.getItem('UserId');
        apiGet('agents', userId)
            .then(response => {
                this.setState({
                    agent: response
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
}
