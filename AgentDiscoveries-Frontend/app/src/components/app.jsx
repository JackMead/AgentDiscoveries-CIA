import * as React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import Login from './user/login';
import Home from './home';
import Page from './page';
import Profile from './profile/profile';
import EditProfilePicture from './profile/edit-profile-picture';
import EditProfileCallSign from './profile/edit-profile-callsign';
import Forum from './submit-forms/submit-message';
import LocationReportSearch from './search-forms/search-location-reports';
import RegionSummarySearch from './search-forms/search-region-summaries';
import LocationReportSubmit from './submit-forms/submit-location-report';
import RegionSummarySubmit from './submit-forms/submit-region-summary';
import Entities from './admin/entities-view';
import TodaysCodePage from './todays-code-page';
import LocationForm from './admin/location-form';
import RegionForm from './admin/region-form';
import UserForm from './admin/user-form';
import Error from './error';
import MyReportsPage from './myReports';
import { Button } from 'react-bootstrap';

import {apiGet} from './utilities/request-helper.js';

export default class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            class: '',
        };

        this.switch = this.switch.bind(this);
    }

    switch() {
        var mode = localStorage.getItem("mode");
        if (mode === "lightMode") {
            localStorage.setItem("mode", "nightMode");
            this.setState({ class: "nightMode" });
        } else {
            localStorage.setItem("mode", "lightMode");
            this.setState({ class: 'lightMode'});
        }
    };

    componentDidMount() {
        var mode = localStorage.getItem("mode");
            if(mode){
                this.setState({ class: mode });
            } else {
                this.setState({ class: 'lightMode' });
            }
    };

    render() {
        apiGet('/checktoken');
        return (
        <div className = {this.state.class}>
            <React.Fragment>
                <Router>
                    <Switch>
                        <Route path='/welcome' exact render={() => <Page ><Home /></Page>} />
                        <Route path='/' exact render={() => <Page><Login /></Page>} />
                        <Route path='/login' render={() => <Page><Login /></Page>} />
                        <Route path='/search/location' render={() => <Page><LocationReportSearch /></Page>} />
                        <Route path='/search/region' render={() => <Page><RegionSummarySearch /></Page>} />
                        <Route path='/submit/location' exact render={() => <Page><LocationReportSubmit /></Page>} />
                        <Route path='/submit/region' render={() => <Page><RegionSummarySubmit /></Page>} />
                        <Route path='/submit/location/edit/:id' render={props => <Page><LocationReportSubmit id={props.match.params.id}/></Page>} />
                        <Route path='/forumMessage' render={() => <Page><Forum /></Page>} />

                        <Route path='/admin/locations' exact render={() => <Page><Entities api='locations' key='locations'/></Page>} />
                        <Route path='/admin/regions' exact render={() => <Page><Entities api='regions' key='regions'/></Page>} />
                        <Route path='/admin/users' exact render={() => <Page><Entities api='users' key='users'/></Page>} />

                        <Route path='/admin/locations/add' render={() => <Page><LocationForm/></Page>} />
                        <Route path='/admin/regions/add' render={() => <Page><RegionForm/></Page>} />
                        <Route path='/admin/users/add' render={() => <Page><UserForm/></Page>} />

                        <Route path='/admin/locations/edit/:id' render={props => <Page><LocationForm id={props.match.params.id} /></Page>} />
                        <Route path='/admin/regions/edit/:id' render={props => <Page><RegionForm id={props.match.params.id} /></Page>} />
                        <Route path='/admin/users/edit/:id' render={props => <Page><UserForm id={props.match.params.id} /></Page>} />

                        <Route path='/message' render={() => <Page><TodaysCodePage /></Page>} />
                        <Route path='/profile' exact render={() => <Page><Profile /></Page>} />
                        <Route path='/profile/edit/callsign' render={() => <Page><EditProfileCallSign /></Page>} />
                        <Route path='/profile/edit/picture' render={() => <Page><EditProfilePicture /></Page>} />

                        <Route path='/myReports' render={() => <Page><MyReportsPage api='reports'/></Page>} />
                        <Route path='/error' render={() => <Page><Error/></Page>}/>
                        <Route render={() => <Page><Error/></Page>}/>
                    </Switch>
                </Router>
            </React.Fragment>
            <center>
                <p> ___________________________________________________________________________________ </p>
                <Button onClick={this.switch} type="submit">Toggle night mode!</Button>
            </center>
            </div>
        );
    }
}
