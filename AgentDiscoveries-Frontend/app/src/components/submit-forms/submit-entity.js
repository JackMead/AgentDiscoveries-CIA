import * as React from "react";
import {
    Form,
    FormGroup,
    FormControl,
    Button,
    ControlLabel
} from "react-bootstrap";
import { handleSubmit } from "./submit-utilities"
import { Message } from "../message"
import { CreateLocation } from "./location-form"
export default class EntitySubmit extends React.Component {

    constructor() {
        super();

        this.state = {
            "submitForm": {},
            "api": "location",
            "message": { "message": "", "type": "danger" },
        }
    }

    componentWillMount() {
        console.log(this.state)
        this.apiForms = {
            "location": <CreateLocation submitForm={this.state.submitForm} onSubmit={this.onSubmit} />,
            "region": <div>Lol2</div>
        } 
        
        console.log(this.apiForms)

        this.setState({"form": <div></div>})
    }

    render() {
        return (
            <div className="col-md-12">
                <Form onChange={this.onSelectApi.bind(this)}>
                    <FormGroup>
                        <ControlLabel>Api</ControlLabel>
                        <FormControl componentClass="select"
                            placeholder="select"
                            inputRef={api => this.state.api = api}>
                            <option />
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
        this.setState({ "form": this.apiForms[this.state.api.value]})
        console.log(this.state.form)
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(this.state.submitForm)
    }
};
