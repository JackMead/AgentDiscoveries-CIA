import * as React from 'react';

import Message from '../message';
import {EditLocation} from './edit-location';
import {EditUser} from './edit-user';
import {apiFormUpdate, apiGet} from '../utilities/request-helper';

export default class EditEntity extends React.Component {
    constructor(props) {
        super();

        // TODO: Dodgy props usage
        this.state = {
            api: props.api,
            id: props.match.params.id,
            entity: {},
            message: { 'message': '', 'type': 'danger' }
        };

        this.submitForm = {};
        this.apiForms = [];

        this.onSubmit = this.onSubmit.bind(this);
        this.setUpEntityForms = this.setUpEntityForms.bind(this);
    }

    componentWillMount() {
        apiGet(this.state.api, this.state.id)
            .then(result => {
                this.setState({
                    entity: result
                });
            })
            .then(_ => {
                this.setUpEntityForms();
            });
    }

    componentWillReceiveProps(props) {
        this.setState({
            api: props.api,
            id: props.match.params.id
        });
    }

    render() {
        return (
            <div className='col-md-8 col-md-offset-2'>
                <Message message={this.state.message} />
                {this.state.form}
            </div>
        );
    }

    onSubmit(event) {
        event.preventDefault();

        apiFormUpdate(this.state.api, this.submitForm, this.state.id)
            .then(window.location.hash = `#/admin/${this.state.api}`)
            .catch(error => this.setState({ message: { message: error.message, type: 'danger' } }));
    }

    setUpEntityForms () {
        this.apiForms = {
            locations: <EditLocation submitForm={this.submitForm} entity={this.state.entity} id={this.state.id} onSubmit={this.onSubmit} />,
            users: <EditUser submitForm={this.submitForm} entity={this.state.entity} id={this.state.id} onSubmit={this.onSubmit} />
        };
        this.setState({ form: this.apiForms[this.state.api] });
    }
}
