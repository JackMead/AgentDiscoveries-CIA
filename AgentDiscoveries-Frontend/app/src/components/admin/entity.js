import React from 'react'
import { Button } from 'react-bootstrap';
import Link from 'react-router-dom/Link';

export default class Entities extends React.Component {
    constructor(props) {
        super()
        this.state = {
            type: props.type,
            id: props.id,
            entity: props.entity
        }
        this.getEntityRow = this.getEntityRow.bind(this)
    }

    componentWillReceiveProps(props) {
        this.setState({
            entity: props.entity
        })
    }

    render(props) {
        return (
            <tr key={`entity-${this.state.entity[0]}`}>
                {this.getEntityRow()}
                <td>
                    <Link to={`/admin/${this.state.type}/${this.state.id}`}>
                        <Button type='button'>Edit</Button>
                    </Link>
                </td>
            </tr>
        )
    }

    getEntityRow() {
        return Object.keys(this.state.entity).map((key) => {
                return (
                    <td>{this.state.entity[key]}</td>
                )
            }
        )
    }
}