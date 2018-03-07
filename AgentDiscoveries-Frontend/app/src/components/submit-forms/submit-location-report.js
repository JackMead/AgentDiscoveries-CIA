import * as React from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  Button,
  ControlLabel,
Checkbox
} from 'react-bootstrap';
import {handleReportSubmit, handleExternalReportSubmit} from '../utilities/submit-utilities';
import {getAll} from '../utilities/get-utilities';
import Message from '../message';


export default class LocationReportSubmit extends React.Component {
  constructor() {
    super();
    this.state = {
      locations: [],
      serverMessage: {message: "", type: "danger"},
      apiMessage: {message: "", type: "danger"}
    };

    this.submitForm = {};
    this.onSubmit = this.onSubmit.bind(this);
    this.getLocationOptions = this.getLocationOptions.bind(this);
  }

  componentWillMount() {
    getAll('locations')
        .then(results => {
          this.setState(
              {locations: results}
          );
        })
        .catch(error => {
          console.log(error);
        });
  }

  render() {
    return (
        <div className='col-md-8 col-md-offset-2'>
          <Form onSubmit={this.onSubmit}>
            <h3>Submit Location Report</h3>

            <Message message={this.state.serverMessage}/>
            <Message message={this.state.apiMessage}/>

            <FormGroup>
              <ControlLabel>Location</ControlLabel>
              <FormControl componentClass='select' required
                           inputRef={location => {
                             this.submitForm.locationId = location
                           }}
                           placeholder='enter location ID'>
                {this.getLocationOptions()}
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
              <ControlLabel>Report</ControlLabel>
              <FormControl type='text' required
                           componentClass='textarea' rows={6}
                           inputRef={reportBody => {
                             this.submitForm.reportBody = reportBody
                           }}
                           placeholder='write report'
                           id="report-input"/>
            </FormGroup>
            <FormGroup>
              <Checkbox type='checkbox'
                        inputRef={sendExternal => {
                          this.submitForm.sendExternal = sendExternal
                        }}>
                Send to external partner
              </Checkbox>
            </FormGroup>
            <Button type='submit' id="submit-report">Submit</Button>
          </Form>
        </div>
    );
  }

  onSubmit(e) {
    e.preventDefault();
    handleReportSubmit('/v1/api/reports/locationstatuses', this.submitForm)
        .then(response => {
          this.setState({serverMessage: {message: "Report filed", type: "info"}})
        })
        .catch(error => {
          this.setState({serverMessage: {message: error.message, type: "danger"}})
        });

    if (this.submitForm.sendExternal.checked) {
      handleExternalReportSubmit(this.submitForm)
          .then(response => {
            this.setState({apiMessage: {message: "External partner received report", type: "info"}})
          })
          .catch(error => {
            this.setState({apiMessage: {message: error.message, type: "danger"}})
          });
    }
  }

  getLocationOptions() {
    return Object.keys(this.state.locations).map(key => {
      let location = this.state.locations[key];
      return <option key={location.locationId}
                     value={location.locationId}>{location.location}, {location.siteName}</option>;
    });
  }
}
