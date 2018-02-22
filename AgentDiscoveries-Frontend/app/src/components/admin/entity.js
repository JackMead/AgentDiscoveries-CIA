import React from 'react'

export default class Entities extends React.Component {
    constructor(props) {
        super()
        this.state = {
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