import * as React from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import Message from '../message';

import * as SearchUtils from '../utilities/search-utilities';
import SearchResult from './search-result';

export default class LocationReportsSearch extends React.Component {
  constructor () {
    super();
    this.state = {
      message: {message: '', type: 'danger'},
      results: []
    };

    this.searchForm = {};
    this.onChange = this.onChange.bind(this);
  }

  render () {
    return (
      <div className='col-md-8 col-md-offset-2'>
        <Form onChange={this.onChange}>
          <h3>Search Location Reports</h3>

          <Message message={this.state.message} />

          <FormGroup>
            <ControlLabel>Agent Call Sign</ControlLabel>
            <FormControl type='text'
              inputRef={callSign => { this.searchForm.callSign = callSign }}
              placeholder='enter agent call sign' />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Location</ControlLabel>
            <FormControl type='number'
              inputRef={locationId => { this.searchForm.locationId = locationId }}
              placeholder='enter location ID' />
          </FormGroup>
          <FormGroup className='form-inline'>
            <ControlLabel className='rm-3'>From</ControlLabel>
            <FormControl className='rm-3' type='date'
              inputRef={fromTime => { this.searchForm.fromTime = fromTime }} />

            <ControlLabel className='rm-3'>To</ControlLabel>
            <FormControl className='rm-3' type='date'
              inputRef={toTime => { this.searchForm.toTime = toTime }} />
          </FormGroup>
        </Form>
        <SearchResult results={this.state.results} />
      </div>
    );
  }

  onChange (e) {
    e.preventDefault();
    SearchUtils.getResultsAsynch('/v1/api/reports/locationstatuses', this.searchForm)
      .then(results => {
        this.setState({ results: results, message: { message: '', type: 'danger' } });
      })
      .catch(error => {
        this.setState({ message: {message: error.message, type: 'danger'} });
      });
  }
}
