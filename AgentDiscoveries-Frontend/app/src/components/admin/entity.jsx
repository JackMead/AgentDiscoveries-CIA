import React from 'react';
import { Button } from 'react-bootstrap';
import Link from 'react-router-dom/Link';

export default class Entity extends React.Component {
    constructor (props) {
        super();

        this.id = Object.values(props.entity)[0]; // TODO: this assumes that id is the first JSON value

        this.getEntityRow = this.getEntityRow.bind(this);
        this.getEditButton = this.getEditButton.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            type: props.type,
            id: Object.values(props.entity)[0], // this assumes that id is the first JSON value
            entity: props.entity
        });
    }

    render() {
        return (
            <tr key={this.id}>
                {this.getEntityRow()}
                <td key='edit'>
                    {this.getEditButton()}
                </td>
            </tr>
        );
    }

    getEntityRow() {
        return Object.keys(this.props.entity).map(key =>
            <td key={key}>{this.props.entity[key]}</td>);
    }

    getEditButton() {
    // TODO: shouldn't use reserved words as properties
        if (this.props.type !== 'regions') {
            return (
                <Link to={`/admin/${this.state.type}/edit/${this.id}`}>
                    <Button type='button'>Edit</Button>
                </Link>
            );
        }
    }
}
