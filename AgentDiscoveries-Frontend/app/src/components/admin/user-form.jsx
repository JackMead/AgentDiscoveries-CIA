import * as React from 'react';
import {Button, Checkbox, Form, FormControl, FormGroup} from 'react-bootstrap';
import AdminForm from './admin-form';
import {apiPost} from '../utilities/request-helper';
import Message from '../message';

export default class UserForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            isAgent: false,
            isAdmin: false,

            agent: {
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                rank: '',
                callSign: ''
            },

            message: {}
        };

        this.onUsernameUpdate = this.onUsernameUpdate.bind(this);
        this.onPasswordUpdate = this.onPasswordUpdate.bind(this);
        this.onIsAgentUpdate = this.onIsAgentUpdate.bind(this);
        this.onIsAdminUpdate = this.onIsAdminUpdate.bind(this);
        this.onAgentUpdate = this.onAgentUpdate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        return (
            <div className='col-md-8 col-md-offset-2'>
                <Message message={this.state.message} />
                <div className='col-md-12'>
                    <Form onSubmit={this.onSubmit}>
                        <h3>Create User</h3>
                        <FormGroup>
                            <FormControl type='text' required
                                placeholder='Enter username'
                                value={this.state.username}
                                onChange={this.onUsernameUpdate}/>
                        </FormGroup>
                        <FormGroup>
                            <FormControl type='password' required
                                placeholder='enter password'
                                value={this.state.password}
                                onChange={this.onPasswordUpdate}/>
                        </FormGroup>
                        <FormGroup>
                            <Checkbox type='checkbox'
                                value={this.state.isAgent}
                                onChange={this.onIsAgentUpdate}>
                                Agent
                            </Checkbox>
                        </FormGroup>

                        {this.state.isAgent && <AdminForm agent={this.state.agent} onUpdate={this.onAgentUpdate}/>}

                        <FormGroup>
                            <Checkbox type='checkbox'
                                value={this.state.isAdmin}
                                onChange={this.onIsAdminUpdate}>
                                Admin
                            </Checkbox>
                        </FormGroup>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </div>
            </div>
        );
    }

    onUsernameUpdate(event) {
        this.setState({ username: event.target.value });
    }

    onPasswordUpdate(event) {
        this.setState({ password: event.target.value });
    }

    onIsAgentUpdate(event) {
        this.setState({ isAgent: event.target.checked });
    }

    onIsAdminUpdate(event) {
        this.setState({ isAdmin: event.target.checked });
    }

    onAgentUpdate(agent) {
        this.setState({ agent: agent });
    }

    onSubmit(event) {
        event.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password,
            admin: this.state.isAdmin
        };

        // TODO: create admin entity independently?
        apiPost('users', user)
            .then(response => {
                if (this.state.isAgent) {
                    const agent = Object.assign({ userId: response.userId }, this.state.agent);
                    return apiPost('agents', agent);
                }
            })
            .then(window.location.hash = '#/admin/users')
            .catch(error => this.setState({ message: { message: error.message, type: 'danger' } }));
    }
}
