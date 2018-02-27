import * as React from "react"
import {
    Form,
    FormGroup,
    FormControl,
    Button,
    ControlLabel
} from "react-bootstrap"

import { handleEntitySubmit } from "../utilities/submit-utilities"
import { Message } from "../message"
import { AddLocation } from "./add-location"
import { AddRegion } from "./add-region"
import { AddUser } from "./add-user"


export default class AddEntity extends React.Component {

    constructor(props) {
        super()

        this.state = {
            api: props.api,
            message: { "message": "", "type": "danger" },
        }
        this.submitForm = {}
        this.apiForms = []

        this.onSubmit = this.onSubmit.bind(this)
        this.onSubmitUser = this.onSubmitUser.bind(this)
        this.getUserForm = this.getUserForm.bind(this)
        this.setUpEntityForms = this.setUpEntityForms.bind(this)
    }

    componentWillMount() {
        this.setUpEntityForms()
    }
    
    componentWillReceiveProps(props) {
        this.setState({
            api: props.api
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
        console.log(this.state)
        handleEntitySubmit(`/v1/api/${this.state.api}`, this.submitForm)
            .then(response => window.location.hash = `#/admin/${this.state.api}`)
            .catch(error => this.setState({ message: { message: error, type: "danger" } }))
    }

    onSubmitUser(e) {
        e.preventDefault()
        var userForm = this.getUserForm()
        console.log(userForm)
        if (this.submitForm.agent.checked) {
            var agentForm = this.submitForm.agentForm
            console.log(agentForm)
        }
    }

    getUserForm() {
        var userForm = Object.assign({}, this.submitForm)
        delete userForm.agent
        delete userForm.agentForm
        return userForm
    }

    setUpEntityForms() {
        this.apiForms = {
            locations: <AddLocation submitForm={this.submitForm} onSubmit={this.onSubmit} />,
            regions: <AddRegion submitForm={this.submitForm} onSubmit={this.onSubmit} />,
            users: <AddUser submitForm={this.submitForm} onSubmit={this.onSubmitUser} />
        }
        this.setState({ form: this.apiForms[this.state.api] })
    }

}
