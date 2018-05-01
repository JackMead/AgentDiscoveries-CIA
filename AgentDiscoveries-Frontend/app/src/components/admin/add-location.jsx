import * as React from 'react';
import {
    Form,
    FormGroup,
    FormControl,
    Button,
    ControlLabel
} from 'react-bootstrap';

export class AddLocation extends React.Component {
    constructor (props) {
        super();

        // TODO: modifying props feels very suspect
        this.submitForm = props.submitForm;
    }

    render (props) {
        return (
            <div className='col-md-12'>
                <Form onSubmit={this.props.onSubmit}>
                    <h3>Create Location</h3>

                    <FormGroup>
                        <ControlLabel>Site Name</ControlLabel>
                        <FormControl type='text' required
                            inputRef={siteName => { this.submitForm.siteName = siteName; }}
                            placeholder='enter site name' />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Location Name</ControlLabel>
                        <FormControl type='text' required
                            inputRef={location => { this.submitForm.location = location; }}
                            placeholder='enter location name' />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Time Zone</ControlLabel>
                        <FormControl type='text' required
                            inputRef={timeZone => { this.submitForm.timeZone = timeZone; }}
                            placeholder='enter time zone (e.g. GMT+1)' />
                    </FormGroup>
                    <Button type='submit'>Submit</Button>
                </Form>
            </div>
        );
    }
}