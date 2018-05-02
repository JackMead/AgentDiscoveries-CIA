import * as React from 'react';

import Message from '../message';
import {AddLocation} from './add-location';
import {AddRegion} from './add-region';
import {AddUser} from './add-user';
import {apiFormCreate} from '../utilities/request-helper';

export default class AddEntity extends React.Component {
    constructor (props) {
        super();

        this.state = {
            api: props.api,
            message: { 'message': '', 'type': 'danger' }
        };

        this.submitForm = {};
        this.apiForms = [];

        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitUser = this.onSubmitUser.bind(this);
        this.submitAgent = this.submitAgent.bind(this);
        this.getUserForm = this.getUserForm.bind(this);
        this.setUpEntityForms = this.setUpEntityForms.bind(this);
    }

    componentWillMount () {
        this.setUpEntityForms();
    }

    // TODO: What?
    componentWillReceiveProps (props) {
        this.setState({
            api: props.api
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

        apiFormCreate(this.state.api, this.submitForm)
            .then(window.location.hash = `#/admin/${this.state.api}`)
            .catch(error => this.setState({ message: { message: error.message, type: 'danger' } }));
    }

    onSubmitUser(event) {
        event.preventDefault();

        const userForm = this.getUserForm();

        apiFormCreate('users', userForm)
            .then(response => {
                if (this.submitForm.agent.checked) {
                    this.submitAgent(response.userId);
                } else {
                    window.location.hash = `#/admin/${this.state.api}`;
                }
            })
            .catch(error => this.setState({ message: { message: error.message, type: 'danger' } }));
    }

    submitAgent(userId) {
        const agentForm = this.submitForm.agentForm;
        agentForm.userId = { value: userId };
        apiFormCreate('agents', agentForm)
            .then(window.location.hash = `#/admin/${this.state.api}`)
            .catch(error => this.setState({ message: { message: `${error.message}. Created the user, but could not create the agent`, type: 'danger' } }));
    }

    getUserForm() {
        const userForm = Object.assign({}, this.submitForm);
        delete userForm.agent;
        delete userForm.agentForm;
        return userForm;
    }

    setUpEntityForms() {
        this.apiForms = {
            locations: <AddLocation submitForm={this.submitForm} onSubmit={this.onSubmit} />,
            regions: <AddRegion submitForm={this.submitForm} onSubmit={this.onSubmit} />,
            users: <AddUser submitForm={this.submitForm} onSubmit={this.onSubmitUser} />
        };
        this.setState({ form: this.apiForms[this.state.api] });
    }
}
