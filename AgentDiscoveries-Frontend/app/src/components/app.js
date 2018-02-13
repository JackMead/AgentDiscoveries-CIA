import * as React from "react";

import Login from "./user/login";
import { isLoggedIn, logOut } from "./user/user-utilities"
import LocationReportSearch from "./search-forms/search-location-reports";
import RegionSummarySearch from "./search-forms/search-region-summaries";
import LocationReportSubmit from "./submit-forms/submit-location-report";
import RegionSummarySubmit from "./submit-forms/submit-region-summary";

import {Tabs, Tab, Button, ButtonGroup} from "react-bootstrap"
export default class Test extends React.Component {

    constructor() {
        super();
        this.state = {
            navbar: this.getNavbar()
        }
    }

    render() {
        return (
            <div className="col-md-12">
                { this.state.navbar }
            </div>
        );
    }

    getNavbar() {
        if (isLoggedIn()) {
            return (
                <div className="col-md-12">
                    <ButtonGroup className="tab-buttons">
                        <Button className="btn-info log-out-button" onClick={this.handleLogOut.bind(this)}>Log Out</Button>
                    </ButtonGroup>
                    <Tabs id="menu" defaultActiveKey={1}>
                        <Tab title="Submit Report" eventKey={1}>
                            <Tabs id="submit-report" defaultActiveKey={1}>
                                <Tab title="Location Report" eventKey={1}>
                                    <LocationReportSubmit />
                                </Tab>
                                <Tab title="Region Summary" eventKey={2}>
                                    <RegionSummarySubmit />
                                </Tab>
                            </Tabs>
                        </Tab>
                        <Tab title="Search Reports" eventKey={2}>
                            <Tabs id="search-reports" defaultActiveKey={1}>
                                <Tab title="Location Report" eventKey={1}>
                                    <LocationReportSearch />
                                </Tab>
                                <Tab title="Region Summary" eventKey={2}>
                                    <RegionSummarySearch />
                                </Tab>
                            </Tabs>
                        </Tab>
                    </Tabs>
                    
            </div>
            )
        } else {
            return (
                <div className="col-md-12">
                    <Login />
                </div>
            )
        }
    }

    handleLogOut(e) {
        e.preventDefault();
        logOut();
        this.setState({navbar: this.getNavbar()})
    }
};