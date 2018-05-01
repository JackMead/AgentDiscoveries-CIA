import * as React from 'react';
import {
    Form,
    FormGroup,
    FormControl,
    Button,
    ControlLabel
} from 'react-bootstrap';

export class EditLocation extends React.Component {
    constructor (props) {
        super();

        // TODO: props modification
        this.submitForm = props.submitForm;
    }

    render (props) {
        return (
            <div className='col-md-12'>
                <Form onSubmit={this.props.onSubmit}>
                    <h3>Edit Location {this.props.id}</h3>

                    <FormGroup>
                        <ControlLabel>Site Name</ControlLabel>
                        <FormControl type='text' required
                            defaultValue={this.props.entity.siteName}
                            inputRef={siteName => { this.submitForm.siteName = siteName; }}
                            placeholder='enter site name' />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Location Name</ControlLabel>
                        <FormControl type='text' required
                            defaultValue={this.props.entity.location}
                            inputRef={location => { this.submitForm.location = location; }}
                            placeholder='enter location name' />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Time Zone</ControlLabel>
                        <FormControl type='text' required
                            defaultValue={this.props.entity.timeZone}
                            inputRef={timeZone => { this.submitForm.timeZone = timeZone; }}
                            placeholder='enter time zone (e.g. GMT+1)' />
                    </FormGroup>
                    <Button type='submit'>Submit</Button>
                </Form>
            </div>
        );
    }
}
