import * as React from "react";
import {
    Form,
    FormGroup,
    FormControl,
    Button,
    ControlLabel
} from "react-bootstrap";
import {Message} from "../message"

import * as SearchUtils from "./search-utilities"
import SearchResult from "./search-result"
export default class RegionSummariesSearch extends React.Component {

    constructor() {
        super();
        this.state = {
            "searchForm": {},
            "message": { "message": "", "type": "danger" },
            "results": []
        }
    }
    render() {
        return (
            <div className="col-md-12">
                <Form onChange={this.onSubmit.bind(this)}>
                    <h3>Search Region Summaries</h3>

                    <Message message={this.state.message} />
                    
                    <FormGroup>
                        <ControlLabel>Region ID</ControlLabel>
                        <FormControl type="text"
                            inputRef={regionId => this.state.searchForm.regionId = regionId}
                            placeholder="enter region ID" />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>User ID</ControlLabel>
                        <FormControl type="text"
                            inputRef={userId => this.state.searchForm.userId = userId}
                            placeholder="enter region ID" />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>From</ControlLabel>
                        <FormControl type="datetime-local"
                            inputRef={fromTime => this.state.searchForm.fromTime = fromTime}
                            defaultValue={SearchUtils.getFormDate(SearchUtils.getDateDaysAgo(7))}/>
                    </FormGroup>
                    <FormGroup>
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
        SearchUtils.getResultsAsynch('/v1/api/reports/regionsummaries', this.state.searchForm)
            .then(results => {
                this.setState({ "results": results, "message": { "message": "", "type": "danger" } })
            })
            .catch(error => this.setState({ "message": { "message": error, "type": "danger" } }))
    }
};
