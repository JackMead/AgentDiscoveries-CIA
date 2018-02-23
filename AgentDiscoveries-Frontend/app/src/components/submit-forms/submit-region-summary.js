import * as React from "react"
import {
    Form,
    FormGroup,
    FormControl,
    Button,
    ControlLabel
} from "react-bootstrap"

import { Message } from "../message"
import { handleReportSubmit } from "./submit-utilities"
import { searchAPI } from "../crud"

import RegionStore from "../../stores/regionStore"
import * as RegionActions from "../../actions/regionActions"

export default class RegionSummarySubmit extends React.Component {

    constructor() {
        super()
        this.state = {
            regions: RegionStore.getAll(),
            message: {message: "", type: "danger"},
        }

        searchAPI("v1/api/regions", "")
            .then(response => response.json())
            .then(response => this.setState({ "regions": response }))

        this.submitForm = {}
        
        this.onSubmit = this.onSubmit.bind(this)
        this.updateRegions = this.updateRegions.bind(this)
        this.getRegionOptions = this.getRegionOptions.bind(this)
    }

    componentWillMount() {
        RegionActions.updateRegions()
        RegionStore.on("change", this.updateRegions)
    }

    componentWillUnmount() {
        RegionStore.removeListener("change", this.updateRegions)
    }

    render() {
        return (
            <div>
                <Form className="col-md-8 col-md-offset-2" onSubmit={this.onSubmit}>

                    <h3>Submit Region Summary</h3>

                    <Message message={this.state.message} />
                    <FormGroup>
                        <ControlLabel>Region</ControlLabel>
                        <FormControl componentClass="select" required
                            inputRef={regionId => this.submitForm.regionId = regionId}
                            placeholder="enter region ID">
                            {this.getRegionOptions()}
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Status</ControlLabel>
                        <FormControl type="number" required
                            inputRef={status => this.submitForm.status = status}
                            placeholder="enter status (numeric)"/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Summary</ControlLabel>
                        <FormControl type="text" required
                            componentClass="textarea" rows={6}
                            inputRef={reportBody => this.submitForm.reportBody = reportBody}
                            placeholder="write region summary" />
                    </FormGroup>
                    <Button className="form-section-inline" type="submit">Submit</Button>
                </Form>
            </div>
        )
    }

    onSubmit(e) {
        e.preventDefault()
        handleReportSubmit('/v1/api/reports/regionsummaries', this.submitForm)
            .then(response => {
                this.setState({message: {message: "Report sent", type: "info"}})
            })
            .catch(error => {
                this.setState({message: {message: error, type: "danger"}})
            })
    }
    
    updateRegions() {
        this.setState({
            regions: RegionStore.getAll()
        })
    }

    getRegionOptions() {
        return Object.keys(this.state.regions).map(key => {
            let region = this.state.regions[key]
            return <option key={region.regionId} value={region.regionId}>{region.name}</option>
        })
    }
}
