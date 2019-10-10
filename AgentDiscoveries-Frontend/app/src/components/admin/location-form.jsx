import * as React from 'react';
import {Button, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';
import {apiGet, apiPost, apiPut} from '../utilities/request-helper';
import Message from '../message';

export default class LocationForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            siteName: '',
            longitude: '',
            latitude: '',
            location: '',
            timeZone: '',
            regionId: '',

            message: {}
        };

        this.onSiteChange = this.onSiteChange.bind(this);
        this.onLongitudeChange = this.onLongitudeChange.bind(this);
        this.onLatitudeChange = this.onLatitudeChange.bind(this);
        this.onLocationChange = this.onLocationChange.bind(this);
        this.onTimeZoneChange = this.onTimeZoneChange.bind(this);
        this.onRegionIdChange = this.onRegionIdChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // In edit mode, the ID of the location is passed in through props
        if (this.props.id) {
            this.loadLocation(this.props.id);
        }
    }

    render() {
        return (
            <div className='col-md-8 col-md-offset-2'>
                <Message message={this.state.message} />
                <div className='col-md-12'>
                    <Form onSubmit={this.onSubmit}>
                        <h3>{this.props.id ? 'Edit' : 'Create'} Location</h3>

                        <FormGroup>
                            <ControlLabel>Site Name</ControlLabel>
                            <FormControl type='text' required
                                placeholder='Enter site name'
                                value={this.state.siteName}
                                onChange={this.onSiteChange}/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Longitude(optional)</ControlLabel>
                            <FormControl type='number'
                                placeholder='±00.0000000'
                                value={this.state.longitude}
                                onChange={this.onLongitudeChange}/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Latitude(optional)</ControlLabel>
                            <FormControl type='number'
                                placeholder='±00.0000000'
                                value={this.state.latitude}
                                onChange={this.onLatitudeChange}/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Location Name</ControlLabel>
                            <FormControl type='text' required
                                placeholder='Enter location name'
                                value={this.state.location}
                                onChange={this.onLocationChange}/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Time Zone</ControlLabel>
                            <FormControl type='text' required
                                placeholder='Enter time zone (e.g. "Europe/London")'
                                value={this.state.timeZone}
                                onChange={this.onTimeZoneChange}/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Region</ControlLabel>
                            <FormControl type='number'
                                placeholder='Enter region ID (optional)'
                                value={this.state.regionId}
                                onChange={this.onRegionIdChange}/>
                        </FormGroup>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </div>
            </div>
        );
    }

    onSiteChange(event) {
        if(event.target.value.length < 200){
            this.setState({ siteName: event.target.value });
        }
    }

    onLongitudeChange(event) {
        if(event.target.value < 100 && event.target.value > -100){
                const newLong = event.target.value === '' ? null : event.target.value //This replaces empty strings with null.
                this.setState({ longitude: newLong });
        }
    }

    onLatitudeChange(event) {
        if(event.target.value < 100 && event.target.value > -100){
                const newLat = event.target.value === '' ? null : event.target.value //This replaces empty strings with null.
                this.setState({ latitude: newLat });
        }
    }

    onLocationChange(event) {
        this.setState({ location: event.target.value });
    }

    onTimeZoneChange(event) {
        this.setState({ timeZone: event.target.value });
    }

    onRegionIdChange(event) {
        this.setState({ regionId: parseInt(event.target.value) });
    }

    onSubmit(event) {
        event.preventDefault();

        const body = {
            siteName: this.state.siteName,
            longitude: this.state.longitude,
            latitude: this.state.latitude,
            location: this.state.location,
            timeZone: this.state.timeZone,
            regionId: this.state.regionId ? this.state.regionId : null
        };

        const request = this.props.id
            ? apiPut('locations', body, this.props.id) //do this if location ID is present
            : apiPost('locations', body); //do this if location ID is not present

        request
            .then(() => window.location.hash = '#/admin/locations')
            .catch(error => this.setState({ message: { message: error.message, type: 'danger' } }));
    }

    loadLocation(id) {
        apiGet('locations', id)
            .then(result => this.setState(result))
            .catch(error => this.setState({ message: { message: error.message, type: 'danger' } }));
    }
}
