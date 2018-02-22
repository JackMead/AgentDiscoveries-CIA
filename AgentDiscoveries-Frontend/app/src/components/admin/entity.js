import React from 'react'

export default class Entities extends React.Component {
    constructor(props) {
        super()
        this.entity = props.entity;
        this.getEntityRows = this.getEntityRows.bind(this)
    }

    render(props) {
        return (
            <div>
                {this.getEntityRows()}
            </div>
        )
    }

    getEntityRows() {
        return Object.keys(this.entity).map((key) => {
            console.log("entity", this.entity)
                return (
                    <div>
                        {key}: {this.entity[key]}
                    </div>
                )
            }
        )
    }
}