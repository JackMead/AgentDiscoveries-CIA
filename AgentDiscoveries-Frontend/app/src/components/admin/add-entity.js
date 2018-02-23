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
import { AddAgent } from "./add-agent"
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
        handleEntitySubmit(`/v1/api/${this.state.api.value}`, this.submitForm)
            .then(response => this.setState({ message: { message: "Entity created successfully", type: "info" } }))
            .catch(error => this.setState({ message: { message: error, type: "danger" } }))
    }

    setUpEntityForms() {
        this.apiForms = {
            locations: <AddLocation submitForm={this.submitForm} onSubmit={this.onSubmit} />,
            regions: <AddRegion submitForm={this.submitForm} onSubmit={this.onSubmit} />,
            users: <AddUser submitForm={this.submitForm} onSubmit={this.onSubmit} />,
            agents: <AddAgent submitForm={this.submitForm} onSubmit={this.onSubmit}/>
        }
        this.setState({ form: this.apiForms[this.state.api] })
    }

}
