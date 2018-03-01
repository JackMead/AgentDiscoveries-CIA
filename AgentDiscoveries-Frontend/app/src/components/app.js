import * as React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Login from './user/login';
import Home from './home';
import Page from './page';
import Profile from './profile/profile';
import EditProfilePicture from './profile/edit-profile-picture';
import EditProfileCallSign from './profile/edit-profile-callsign';

import LocationReportSearch from './search-forms/search-location-reports';
import RegionSummarySearch from './search-forms/search-region-summaries';
import LocationReportSubmit from './submit-forms/submit-location-report';
import RegionSummarySubmit from './submit-forms/submit-region-summary';
import AddEntity from './admin/add-entity';
import EditEntity from './admin/edit-entity';
import Entities from './admin/entities-view';
import TodaysCodePage from './todays-code-page';

export default class App extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route path='/' exact render={() => <Page><Home /></Page>} />
            <Route path='/login' render={() => <Page><Login /></Page>} />
            <Route path='/search/location' render={() => <Page><LocationReportSearch /></Page>} />
            <Route path='/search/region' render={() => <Page><RegionSummarySearch /></Page>} />
            <Route path='/submit/location' render={() => <Page><LocationReportSubmit /></Page>} />
            <Route path='/submit/region' render={() => <Page><RegionSummarySubmit /></Page>} />

            <Route path='/admin/locations' exact render={() => <Page><Entities api='locations' /></Page>} />
            <Route path='/admin/regions' exact render={() => <Page><Entities api='regions' /></Page>} />
            <Route path='/admin/users' exact render={() => <Page><Entities api='users' /></Page>} />

            <Route path='/admin/locations/add' render={() => <Page><AddEntity api='locations' /></Page>} />
            <Route path='/admin/regions/add' render={() => <Page><AddEntity api='regions' /></Page>} />
            <Route path='/admin/users/add' render={() => <Page><AddEntity api='users' /></Page>} />

            <Route path='/admin/locations/edit/:id' render={(props) => <Page><EditEntity api='locations' {...props} /></Page>} />
            <Route path='/admin/users/edit/:id' render={(props) => <Page><EditEntity api='users' {...props} /></Page>} />

            <Route path='/message' render={() => <Page><TodaysCodePage /></Page>} />
            <Route path='/profile' exact render={() => <Page><Profile /></Page>} />
            <Route path='/profile/edit/callsign' render={() => <Page><EditProfileCallSign /></Page>} />
            <Route path='/profile/edit/picture' render={() => <Page><EditProfilePicture /></Page>} />

          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}
