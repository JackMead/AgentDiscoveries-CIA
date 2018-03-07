import * as React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Entity from './entity';

import { getAll } from '../utilities/get-utilities';

export default class Entities extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      api: props.api,
      entities: {
        locations: [],
        regions: [],
        agents: [],
        users: []
      }
    };

    this.submitForm = {};

    this.updateEntities = this.updateEntities.bind(this);
    this.getTable = this.getTable.bind(this);
    this.getTableHeader = this.getTableHeader.bind(this);
    this.getTableBody = this.getTableBody.bind(this);
  }

  componentWillMount () {
    this.updateEntities();
  }

  componentWillReceiveProps (props) {
    this.setState({
      api: props.api
    });
    this.updateEntities();
  }

  render () {
    return (
      <div className='col-md-8 col-md-offset-2'>
        <h3>{this.state.api}</h3>
        <Link to={`/admin/${this.state.api}/add`}>
          <Button type='button'>
            {`Add ${this.state.api}`}
          </Button>
        </Link>
        {this.getTable()}
      </div>
    );
  }

  getTable () {
    if (this.state.entities[this.state.api].length > 0) {
      return (
        <Table key='{this.state.api}-table' striped >
          {this.getTableHeader()}
          {this.getTableBody()}
        </Table>
      );
    }
  }

  getTableHeader () {
    let entity = this.state.entities[this.state.api][0];
    return (
      <thead>
        <tr>
          {Object.keys(entity).map(key => {
            return <th key={key}>{key}</th>;
          })}
        </tr>
      </thead>
    );
  }

  getTableBody () {
    let entities = this.state.entities[this.state.api];
    return (
      <tbody>
        {Object.values(entities).map(val => {
          return <Entity key={Object.values(val)[0]} entity={val} type={this.state.api} />;
        })}
      </tbody>
    );
  }

  updateEntities () {
    Object.keys(this.state.entities).forEach((api) => {
      getAll(api)
        .then(results => {
          const entities = this.state.entities;
          entities[api] = results;
          this.setState({
            entities: entities
          });
        })
        .catch(error => {
          console.log(error);
        });
    });
  }
}
