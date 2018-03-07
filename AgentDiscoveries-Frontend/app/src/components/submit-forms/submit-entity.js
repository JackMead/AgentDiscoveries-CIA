import * as React from "react";
import {
    Form,
    FormGroup,
    FormControl,
    Button,
    ControlLabel
} from "react-bootstrap";
import { handleEntitySubmit } from "../utilities/submit-utilities"
import { Message } from "../message"
import { CreateLocation } from "./location-form"
import { CreateRegion } from "./region-form"
import { CreateAgent } from "./agent-form"
import { CreateUser } from "./user-form"

export default class EntitySubmit extends React.Component {

    constructor() {
        super();

        this.state = {
            api: "locations",
            message: { "message": "", "type": "danger" },
        }

        this.submitForm = {};
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        this.apiForms = {
            locations: <CreateLocation submitForm={this.submitForm} onSubmit={this.onSubmit} />,
            regions: <CreateRegion submitForm={this.submitForm} onSubmit={this.onSubmit} />,
            users: <CreateUser submitForm={this.submitForm} onSubmit={this.onSubmit} />,
            agents: <CreateAgent submitForm={this.submitForm} onSubmit={this.onSubmit} />
        }

        this.setState({ form: this.apiForms[this.state.api]})
    }

    render() {
        return (
            <div className="col-md-8 col-md-offset-2">
            
                <Message message={this.state.message} />

                <Form onChange={this.onSelectApi.bind(this)}>
                    <FormGroup>
                        <ControlLabel>Api</ControlLabel>
                        <FormControl componentClass="select"
                            placeholder="select"
                            inputRef={api => this.state.api = api}>
                            {this.getFormApiOptions()}
                        </FormControl>
                    </FormGroup>
                </Form>

                {this.state.form}
            </div>
        );
    }

    getFormApiOptions() {
        return Object.keys(this.apiForms).map(key => {
            return <option key={key} value={key}>{key}</option>
        });
    }

    onSelectApi(e) {
        e.preventDefault();
        this.setState({
            form: this.apiForms[this.state.api.value],
            message: { message: "", type: "danger" }
        })
    }

    onSubmit(e) {
        e.preventDefault();
        handleEntitySubmit(`/v1/api/${this.state.api.value}`, this.submitForm)
            .then(response => this.setState({ message: { message: "Entity created successfully", type: "info" } }))
            .catch(error => this.setState({ message: { message: error, type: "danger" } }))
    }
};
