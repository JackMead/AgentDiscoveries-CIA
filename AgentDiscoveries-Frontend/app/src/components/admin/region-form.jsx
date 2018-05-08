import * as React from 'react';
import {Button, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';
import {apiGet, apiPost, apiPut} from '../utilities/request-helper';
import Message from '../message';

export default class RegionForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            locations: '',

            message: {}
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onLocationsChange = this.onLocationsChange.bind(this);
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
                        <FormGroup>
                            <ControlLabel>Location IDs</ControlLabel>
                            <FormControl type='text' required
                                placeholder='Enter location IDs (comma separated)'
                                value={this.state.locations}
                                onChange={this.onLocationsChange}/>
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

    onLocationsChange(event) {
        this.setState({ locations: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();

        const body = {
            name: this.state.name,
            locations: this.state.locations.split(/,/)
                .map(item => parseInt(item.trim()))
                .filter(item => !isNaN(item))
        };

        const request = this.props.id
            ? apiPut('regions', body, this.props.id)
            : apiPost('regions', body);

        request
            .then(window.location.hash = '#/admin/regions')
            .catch(error => this.setState({ message: { message: error.message, type: 'danger' } }));
    }

    loadRegion(id) {
        apiGet('regions', id)
            .then(result => this.setState(result))
            .catch(error => this.setState({ message: { message: error.message, type: 'danger' } }));
    }
}
