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

export default class RegionSummariesSearch extends React.Component {
  constructor () {
    super();
    this.state = {
      message: { message: '', type: 'danger' },
      results: []
    };

    this.searchForm = { };
    this.onChange = this.onChange.bind(this);
  }


  render () {
    return (
      <div className='col-md-8 col-md-offset-2'>
        <Form onChange={this.onChange}>
          <h3>Search Region Summaries</h3>

          <Message message={this.state.message} />

          <FormGroup>
            <ControlLabel>Region</ControlLabel>
            <FormControl type='text'
              inputRef={regionId => { this.searchForm.regionId = regionId }}
              placeholder='enter region ID' />
          </FormGroup>
          <FormGroup>
            <ControlLabel>User</ControlLabel>
            <FormControl type='text'
              inputRef={userId => { this.searchForm.userId = userId }}
              placeholder='enter user ID' />
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
    SearchUtils.getResultsAsynch('/v1/api/reports/regionsummaries', this.searchForm)
      .then(results => {
        this.setState({ results: results, message: { message: '', type: 'danger' } });
      })
      .catch(error => {
        this.setState({ message: { message: error.message, type: 'danger' } });
      });
  }
}
