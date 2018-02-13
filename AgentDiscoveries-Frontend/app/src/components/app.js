import * as React from "react";

import Navbar from "./navbar";
import Login from "./login";
import LocationReportSearch from "./search-forms/search-location-reports";
import RegionSummarySearch from "./search-forms/search-region-summaries";
import LocationReportSubmit from "./submit-forms/submit-location-report";
import RegionSummarySubmit from "./submit-forms/submit-region-summary";

import {Tabs, Tab} from "react-bootstrap"
export default class Test extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="col-md-12">
                <Tabs id="menu" defaultActiveKey={1}>
                    <Tab title="Login" eventKey={1}>
                        <Login />
                    </Tab>
                    <Tab title="Submit Report" eventKey={2}>
                        <Tabs id="submit-report" defaultActiveKey={1}>
                            <Tab title="Location Report" eventKey={1}>
                                <LocationReportSubmit />
                            </Tab>
                            <Tab title="Region Summary" eventKey={2}>
                                <RegionSummarySubmit />
                            </Tab>
                        </Tabs>
                    </Tab>
                    <Tab title="Search Reports" eventKey={3}>
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
        );
    }
};