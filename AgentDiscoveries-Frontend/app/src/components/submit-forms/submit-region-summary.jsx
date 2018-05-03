import * as React from 'react';
import {Button, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';

import {Messages} from '../message';
import {apiGet, apiPost} from '../utilities/request-helper';

export default class RegionSummarySubmit extends React.Component {
    constructor() {
        super();

        this.state = {
            regions: [],

            regionId: '',
            status: '',
            reportBody: '',

            messages: []
        };

        this.onRegionChange = this.onRegionChange.bind(this);
        this.onStatusChange = this.onStatusChange.bind(this);
        this.onReportBodyChange = this.onReportBodyChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        apiGet('regions')
            .then(results => this.setState({ regions: results }))
            .catch(() => this.addMessage('Error fetching regions, please try again later', 'danger'));
    }

    render() {
        return (
            <div>
                <Form className='col-md-8 col-md-offset-2' onSubmit={this.onSubmit}>
                    <h3>Submit Region Summary</h3>

                    <Messages messages={this.state.messages}/>

                    <FormGroup>
                        <ControlLabel>Region</ControlLabel>
                        <FormControl componentClass='select' required
                            value={this.state.regionId}
                            onChange={this.onRegionChange}>
                            <option value='' hidden>Choose a region</option>
                            {this.state.regions.map(region =>
                                <option key={region.regionId} value={region.regionId}>{region.name}</option>)}
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Status</ControlLabel>
                        <FormControl type='number' required
                            placeholder='Enter numeric status code'
                            value={this.state.status}
                            onChange={this.onStatusChange}
                            id="status-input"/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Summary</ControlLabel>
                        <FormControl type='text' required
                            componentClass='textarea' rows={6}
                            placeholder='Write region summary'
                            value={this.state.reportBody}
                            onChange={this.onReportBodyChange}
                            id="report-input"/>
                    </FormGroup>
                    <Button type='submit' id="submit-report">Submit</Button>
                </Form>
            </div>
        );
    }

    onRegionChange(event) {
        this.setState({ regionId: parseInt(event.target.value) });
    }

    onStatusChange(event) {
        this.setState({ status: parseInt(event.target.value) });
    }

    onReportBodyChange(event) {
        this.setState({ reportBody: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();

        const body = {
            regionId: this.state.regionId,
            status: this.state.status,
            reportBody: this.state.reportBody,
            reportTime: new Date().toJSON() // TODO: do this server-side?
        };

        apiPost('reports/regionsummaries', body)
            .then(() => this.addMessage('Report submitted', 'info'))
            .catch(() => this.addMessage('Error submitting report, please try again later', 'danger'));
    }

    addMessage(message, type) {
        this.setState(oldState => {
            return { messages: [...oldState.messages, { message: message, type: type }] };
        });
    }
}
