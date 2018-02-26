import * as React from "react"
import {
    Form,
    FormGroup,
    FormControl,
    Button,
    ControlLabel
} from "react-bootstrap"

import { handleEntityEdit } from "../utilities/submit-utilities"
import { Message } from "../message"
import { EditLocation } from "./edit-location"
import { EditUser } from "./edit-user"


export default class EditEntity extends React.Component {

    constructor(props) {
        super()
        this.state = {
            api: props.api,
            id: props.match.params.id,
            message: { "message": "", "type": "danger" },
        }
        this.submitForm = {}
        this.apiForms = []

        this.onSubmit = this.onSubmit.bind(this)
        this.setUpEntityForms = this.setUpEntityForms.bind(this)
    }

    componentWillMount() {
        this.setUpEntityForms()
    }

    componentWillReceiveProps(props) {
        this.setState({
            api: props.api,
            id: props.match.params.id
        })
    }

    render() {
        return (
            <div className="col-md-8 col-md-offset-2">
                <Message message={this.state.message} />
                {this.state.form}
            </div>
        )
    }

    onSubmit(e) {
        e.preventDefault()
        handleEntityEdit(`/v1/api/${this.state.api}`, this.state.id, this.submitForm)
            .then(_ => window.location.hash = `#/admin/${this.state.api}`)
            .catch(error => this.setState({ message: { message: error, type: "danger" } }))
    }

    setUpEntityForms() {
        this.apiForms = {
            locations: <EditLocation submitForm={this.submitForm} id={this.state.id} onSubmit={this.onSubmit} />,
            users: <EditUser submitForm={this.submitForm} id={this.state.id} onSubmit={this.onSubmit} />
        }
        this.setState({ form: this.apiForms[this.state.api] })
    }

}
