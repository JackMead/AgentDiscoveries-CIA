import * as React from "react";
import {
    Form,
    FormGroup,
    FormControl,
    Button,
    ControlLabel
} from "react-bootstrap";

import * as SearchUtils from "./search-utilities"

import SearchResult from "./search-result"
export default class LocationReportsSearch extends React.Component {

    constructor() {
        super();
        this.state = {
            "searchForm": {},
            "results": []
        }
    }

    render() {
        return (
            <div className="col-md-12">
                <Form onChange={this.onSubmit.bind(this)}>
                    <h3>API Location Report Search</h3>

                    <FormGroup>
                        <ControlLabel>Agent ID</ControlLabel>
                        <FormControl type="text"
                            inputRef={agentId => this.state.searchForm.agentId = agentId}
                            placeholder="enter agent ID" />

                        <ControlLabel>Location ID</ControlLabel>
                        <FormControl type="text"
                            inputRef={locationId => this.state.searchForm.locationId = locationId}
                            placeholder="enter location ID" />

                        <ControlLabel>From</ControlLabel>
                        <FormControl type="datetime-local"
                            inputRef={fromTime => this.state.searchForm.fromTime = fromTime}
                            defaultValue={SearchUtils.getFormDate(SearchUtils.getDateDaysAgo(7))}
                        />

                        <ControlLabel>To</ControlLabel>
                        <FormControl type="datetime-local"
                            inputRef={toTime => this.state.searchForm.toTime = toTime}
                            defaultValue={SearchUtils.getFormDate(new Date())} />
                    </FormGroup>
                </Form>
                
                <SearchResult results={this.state.results} />
            </div>
        );
    }

    onSubmit(e) {
        e.preventDefault();
        SearchUtils.getResultsAsynch('/v1/api/reports/locationstatuses', this.state.searchForm)
            .then(results => {
                console.log(results),
                this.setState({ "results": results, "errorMessage": "" })})
            .catch(error => this.setState({ "errorMessage": error }))
    }
};
