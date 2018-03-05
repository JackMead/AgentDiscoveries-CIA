import React from 'react';
import { Button } from 'react-bootstrap';
import Link from 'react-router-dom/Link';

export default class Entity extends React.Component {
  constructor (props) {
    super();
    this.state = {
      type: props.type,
      id: Object.values(props.entity)[0], // this assumes that id is the first JSON value
      entity: props.entity
    };

    this.getEntityRow = this.getEntityRow.bind(this);
    this.getEditButton = this.getEditButton.bind(this);
  }

  componentWillReceiveProps (props) {
    this.setState({
      type: props.type,
      id: Object.values(props.entity)[0], // this assumes that id is the first JSON value
      entity: props.entity
    });
  }

  render (props) {
    return (
      <tr key={Object.values(this.state.entity)[0]}>
        {this.getEntityRow()}
        <td key='edit'>
          {this.getEditButton()}
        </td>
      </tr>
    );
  }

  getEntityRow () {
    return Object.keys(this.state.entity).map((key) => {
      return (
        <td key={key}>{this.state.entity[key]}</td>
      );
    }
    );
  }

  getEditButton () {
    if (this.state.type !== 'regions') {
      return (
        <Link to={`/admin/${this.state.type}/edit/${this.state.id}`}>
          <Button type='button'>Edit</Button>
        </Link>
      );
    }
  }
}
