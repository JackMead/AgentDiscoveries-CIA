import * as React from "react"
import {
  Form,
  FormGroup,
  FormControl,
  Button,
  ControlLabel,
  Checkbox
} from "react-bootstrap"
import {handleReportSubmit, handleExternalReportSubmit} from "./submit-utilities"
import {Message} from "../message"
import {searchAPI} from "../crud"

import * as LocationActions from "../../actions/locationActions"
import LocationStore from "../../stores/locationStore"

export default class LocationReportSubmit extends React.Component {

  constructor() {
    super();
    this.state = {
      locations: LocationStore.getAll(),
      serverMessage: {message: "", type: "danger"},
      apiMessage: {message: "", type: "danger"}
    };

    this.submitForm = {}

    this.onSubmit = this.onSubmit.bind(this)
    this.updateLocations = this.updateLocations.bind(this)
    this.getLocationOptions = this.getLocationOptions.bind(this)
  }

  componentWillMount() {
    LocationActions.updateLocations()
    LocationStore.on("change", this.updateLocations)
  }

  componentWillUnmount() {
    LocationStore.removeListener("change", this.updateLocations)
  }

  render() {
    return (
        <div className="col-md-8 col-md-offset-2">
          <Form onSubmit={this.onSubmit}>
            <h3>Submit Location Report</h3>

            <Message message={this.state.serverMessage}/>
            <Message message={this.state.apiMessage}/>

            <FormGroup>
              <ControlLabel>Location</ControlLabel>
              <FormControl componentClass="select" required
                           inputRef={location => this.submitForm.locationId = location}
                           placeholder="enter location ID">
                {this.getLocationOptions()}
              </FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Status</ControlLabel>
              <FormControl type="number" required
                           inputRef={status => this.submitForm.status = status}
                           placeholder="enter status (numeric)"/>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Report</ControlLabel>
              <FormControl type="text" required
                           componentClass="textarea" rows={6}
                           inputRef={reportBody => this.submitForm.reportBody = reportBody}
                           placeholder="write report"/>
            </FormGroup>
            <FormGroup>
              <Checkbox type='checkbox'
                        inputRef={sendExternal => {
                          this.submitForm.sendExternal = sendExternal
                        }}>
                Send to external partner
              </Checkbox>
            </FormGroup>
            <Button className="form-section-inline" type="submit">Submit</Button>
          </Form>
        </div>
    )
  }

  onSubmit(e) {
    e.preventDefault();
    handleReportSubmit('/v1/api/reports/locationstatuses', this.submitForm)
        .then(response => {
          this.setState({serverMessage: {message: "Report filed", type: "info"}})
        })
        .catch(error => {
          this.setState({serverMessage: {message: error, type: "danger"}})
        });

    if (this.submitForm.sendExternal.checked) {
      handleExternalReportSubmit(this.submitForm)
          .then(response => {
            this.setState({apiMessage: {message: "External partner received report", type: "info"}})
          })
          .catch(error => {
            this.setState({apiMessage: {message: error, type: "danger"}})
          });
    }
  }

  updateLocations() {
    this.setState({
      locations: LocationStore.getAll()
    })
  }

  getLocationOptions() {
    return Object.keys(this.state.locations).map(key => {
      let location = this.state.locations[key]
      return <option key={location.locationId}
                     value={location.locationId}>{location.location}, {location.siteName}</option>
    })
  }
}
