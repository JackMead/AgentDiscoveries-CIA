import * as React from 'react';
import {Button, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';
import {apiGet, apiPost, apiPut} from '../utilities/request-helper';
import Message from '../message';

export default class RegionForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',

            message: {}
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // In edit mode, the ID of the region is passed in through props
        if (this.props.id) {
            this.loadRegion(this.props.id);
        }
    }

    render() {
        return (
            <div className='col-md-8 col-md-offset-2'>
                <Message message={this.state.message} />
                <div className='col-md-12'>
                    <Form onSubmit={this.onSubmit}>
                        <h3>{this.props.id ? 'Edit' : 'Create'} Region</h3>

                        <FormGroup>
                            <ControlLabel>Region Name</ControlLabel>
                            <FormControl type='text' required
                                placeholder='Enter region name'
                                value={this.state.name}
                                onChange={this.onNameChange}/>
                        </FormGroup>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </div>
            </div>
        );
    }

    onNameChange(event) {
        this.setState({ name: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();

        const body = {
            name: this.state.name
        };

        const request = this.props.id
            ? apiPut('regions', body, this.props.id)
            : apiPost('regions', body);

        request
            .then(() => window.location.hash = '#/admin/regions')
            .catch(error => this.handleError(error));
    }

    loadRegion(id) {
        apiGet('regions', id)
            .then(result => this.setState({ name: result.name, locations: result.locations.join(', ') }))
            .catch(error => this.handleError(error));
    }

    handleError(error){
        error.response.json().then(result => {
        console.log(result);
        this.setState({ message: { message: result.message, type: 'danger' } });
        })}

}
