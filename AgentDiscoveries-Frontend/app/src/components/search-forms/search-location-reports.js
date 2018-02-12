import * as React from "react";
import {
    Form,
    FormGroup,
    FormControl,
    Button,
    ControlLabel
} from "react-bootstrap";

import * as SearchUtils from "./search-utilities"

import * as CRUD from "../crud"
import SearchResult from "./search-result"
import { searchAPI } from "../crud";
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
            <div>
                <Form onSubmit={this.handleSearch.bind(this)}>
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

                        <ControlLabel>Region ID</ControlLabel>
                        <FormControl type="text"
                            inputRef={regionId => this.state.searchForm.regionId = regionId}
                            placeholder="enter region ID" />

                        <ControlLabel>User ID</ControlLabel>
                        <FormControl type="text"
                            inputRef={userId => this.state.searchForm.userId = userId}
                            placeholder="enter region ID" />

                        <ControlLabel>From</ControlLabel>
                        <FormControl type="datetime-local"
                            inputRef={fromTime => this.state.searchForm.fromTime = fromTime}
                            defaultValue={SearchUtils.getFormDate(SearchUtils.getDateDaysAgo(7))}
                        />

                        <ControlLabel>To</ControlLabel>
                        <FormControl type="datetime-local"
                            inputRef={toTime => this.state.searchForm.toTime = toTime}
                            defaultValue={SearchUtils.getFormDate(new Date())} />

                        <Button type="submit">Search</Button>
                    </FormGroup>
                </Form>
                <h3>Results</h3>
                
                <SearchResult results={this.state.results} />
            </div>
        );
    }

    handleSearch(e) {
        e.preventDefault();

        const searchParams = Object.keys(this.state.searchForm).map((key) => {
            return this.state.searchForm[key].value == "" ? "" : encodeURIComponent(key) + '=' + encodeURIComponent(SearchUtils.getTransformedData(key, this.state.searchForm[key].value));
        }).filter(el => el != "" && el).join('&');

        CRUD.searchAPI("/v1/api/reports/locationstatuses?", searchParams)
            .then(response => response.json())
            .then(response => {
                this.setState({"results": response});
            })
    }

};