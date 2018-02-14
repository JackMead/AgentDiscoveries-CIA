import * as React from "react";
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import Login from "./user/login";
import Home from "./home";
import Page from "./page";

import LocationReportSearch from "./search-forms/search-location-reports";
import RegionSummarySearch from "./search-forms/search-region-summaries";
import LocationReportSubmit from "./submit-forms/submit-location-report";
import RegionSummarySubmit from "./submit-forms/submit-region-summary";

export default class App extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Router>
                    <Switch>
                        <Route path="/" exact render={() => <Page><Home /></Page>} />
                        <Route path="/login" render={() => <Page><Login /></Page>}/>
                        <Route path="/search/location" render={() => <Page><LocationReportSearch /></Page>} />
                        <Route path="/search/region" render={() => <Page><RegionSummarySearch /></Page>} />
                        <Route path="/submit/location" render={() => <Page><LocationReportSubmit /></Page>} />
                        <Route path="/submit/region" render={() => <Page><RegionSummarySubmit /></Page>} />
                    </Switch>
                </Router>
            </React.Fragment>
        );
    }
};