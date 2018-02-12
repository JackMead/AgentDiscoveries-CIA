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
import * as CRUD from "../crud"

export default class RegionSummariesSearch extends React.Component {

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
                <Form onSubmit={this.handleSearch.bind(this)}>
                    <h3>API Region Report Search</h3>

                    <FormGroup>
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

                <SearchResult results={this.state.results} />
            </div>
        );
    }

    handleSearch(e) {
        e.preventDefault();

        const searchParams = Object.keys(this.state.searchForm).map((key) => {
            return this.state.searchForm[key].value == "" ? "" : encodeURIComponent(key) + '=' + encodeURIComponent(SearchUtils.getTransformedData(key, this.state.searchForm[key].value));
        }).filter(el => el != "" && el).join('&');

        CRUD.searchAPI("/v1/api/reports/regionsummaries", searchParams)
            .then(response => response.json())
            .then(response => {
                this.setState({ "results": response });
            })
    }

};