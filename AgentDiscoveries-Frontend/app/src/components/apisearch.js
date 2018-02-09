import * as React from "react";
import {
    Form,
    FormGroup,
    FormControl,
    Button,
    ControlLabel
} from "react-bootstrap";
import * as CRUD from "./crud"

export default class ApiSearch extends React.Component {

    constructor() {
        super();
        this.state = {
            "searchForm": {}
        }
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSearch.bind(this)}>
                    <h3>Api Search</h3>

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
                            defaultValue={this.getFormDate(this.getDateDaysAgo(7))}
                            />

                        <ControlLabel>To</ControlLabel>
                        <FormControl type="datetime-local"
                            inputRef={toTime => this.state.searchForm.toTime = toTime}
                            defaultValue={this.getFormDate(new Date())}/>

                        <Button type="submit">Search</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }

    handleSearch(e) {
        e.preventDefault();

        const searchParams = Object.keys(this.state.searchForm).map((key) => {
            return this.state.searchForm[key].value == "" ? "" : encodeURIComponent(key) + '=' + encodeURIComponent(this.getTransformedData(key));
        }).filter(el => el != "" && el).join('&');

        console.log(searchParams);
        CRUD.searchAPI("/v1/api/reports/locationstatuses", searchParams)
            .then(response => response.json())
            .then(response => console.log(response))
    }

    getDateDaysAgo(daysAgo) {
        let date = new Date();
        date.setDate(date.getDate() - daysAgo);
        return date
    }

    getFormDate(date) {
        return date.toISOString().slice(0, 16);
    }

    getTransformedData(key) {
        var transformedData = this.state.searchForm[key].value;
        switch (key) {
            case "fromTime":
            case "toTime":
                transformedData = transformedData.length > 0 && transformedData !== undefined ? transformedData + "Z" : "";
            
        }
        console.log(key, transformedData);
        return transformedData;
    }
    
};