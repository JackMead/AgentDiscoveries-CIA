import React from 'react';
import {Button} from 'react-bootstrap';
import Link from 'react-router-dom/Link';

export default class Entity extends React.Component {
    constructor (props) {
        super(props);

        // Assume that the first JSON property is the ID property
        this.id = Object.values(props.entity)[0];
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

        if(this.props.type == "users"){ //user specific operations
            delete this.props.entity.password

        }

        console.log("THESE ARE THE ENTITY PROPERTIES")
        console.log(this.props)

        return Object.keys(this.props.entity).map(key =>
        {
        const display = this.props.entity[key] === null ? '' : this.props.entity[key].toString();
            return <td key={key}>{display}</td>;
            })
    }

    getEditButton() {
        return (
            <Link to={`/admin/${this.props.type}/edit/${this.id}`}>
                <Button type='button'>Edit</Button>
            </Link>
        );
    }
}
