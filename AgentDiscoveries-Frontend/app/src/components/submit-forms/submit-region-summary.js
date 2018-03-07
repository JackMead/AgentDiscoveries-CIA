import * as React from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  Button,
  ControlLabel

} from 'react-bootstrap';

import Message from '../message';
import {handleReportSubmit} from '../utilities/submit-utilities';
import {getAll} from '../utilities/get-utilities';
import {searchAPI} from '../crud';

export default class RegionSummarySubmit extends React.Component {
  constructor() {
    super();
    this.state = {
      regions: [],
      message: {message: '', type: 'danger'}
    };


    searchAPI('v1/api/regions', '')
        .then(response => response.json())
        .then(response => this.setState({'regions': response}));

    this.submitForm = {};

    this.onSubmit = this.onSubmit.bind(this);
    this.getRegionOptions = this.getRegionOptions.bind(this);
  }

  componentWillMount() {
    getAll('regions')
        .then(results =>
            this.setState({
              regions: results
            })
        )
        .catch(error => {
          console.log(error);
        });
  }

  render() {
    return (
        <div>
          <Form className='col-md-8 col-md-offset-2' onSubmit={this.onSubmit}>

            <h3>Submit Region Summary</h3>
            <Message message={this.state.message}/>
            <FormGroup>
              <ControlLabel>Region</ControlLabel>
              <FormControl componentClass='select' required
                           inputRef={regionId => {
                             this.submitForm.regionId = regionId
                           }}
                           placeholder='enter region ID'>
                {this.getRegionOptions()}
              </FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Status</ControlLabel>
              <FormControl type='number' required
                           inputRef={status => {
                             this.submitForm.status = status
                           }}
                           placeholder='enter status (numeric)'
                           id="status-input"/>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Summary</ControlLabel>
              <FormControl type='text' required
                           componentClass='textarea' rows={6}
                           inputRef={reportBody => {
                             this.submitForm.reportBody = reportBody
                           }}
                           placeholder='write region summary'
                           id="report-input"/>
            </FormGroup>
            <Button type='submit' id="submit-report">Submit</Button>
          </Form>
        </div>
    );
  }

  onSubmit(e) {
    e.preventDefault();
    handleReportSubmit('/v1/api/reports/regionsummaries', this.submitForm)
        .then(response => {
          this.setState({message: {message: 'Report sent', type: 'info'}});
        })
        .catch(error => {
          this.setState({message: {message: error.message, type: 'danger'}});
        });
  }

  getRegionOptions() {
    return Object.keys(this.state.regions).map(key => {
      let region = this.state.regions[key];
      return <option key={region.regionId} value={region.regionId}>{region.name}</option>;
    });
  }
}
