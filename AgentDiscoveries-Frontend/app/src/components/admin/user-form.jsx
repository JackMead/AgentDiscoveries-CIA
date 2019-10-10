import * as React from 'react';
import {Button, Checkbox, Form, FormControl, FormGroup} from 'react-bootstrap';
import AgentForm from './agent-form';
import {apiGet, apiPost, apiPut} from '../utilities/request-helper';
import Message from '../message';

export default class UserForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            isAgent: false,
            isAdmin: false,

            agentId: '',

            agent: {
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                agentRank: '',
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

        if (this.props.id) {
            this.loadUser(this.props.id);
        }
    }

    render() {
        return (
            <div className='col-md-8 col-md-offset-2'>
                <Message message={this.state.message} />
                <div className='col-md-12'>
                    <Form onSubmit={this.onSubmit}>
                        <h3>{this.props.id ? 'Edit' : 'Create'} User</h3>
                        <FormGroup>
                            <FormControl type='text' required
                                placeholder='Enter username'
                                value={this.state.username}
                                onChange={this.onUsernameUpdate}/>
                        </FormGroup>
                        <FormGroup>
                            <FormControl type='password' required={!this.props.id}
                                placeholder={'Enter password' + (this.props.id ? ' (leave blank if unchanged)' : '')}
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

                        {this.state.isAgent && <AgentForm agent={this.state.agent} onUpdate={this.onAgentUpdate}/>}

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
        const agentIdPromise = this.state.isAgent
            ? this.state.agentId
                ? apiPut('agents', this.state.agent, this.state.agentId).then(() => this.state.agentId)
                : apiPost('agents', this.state.agent).then(response => response.agentId)
            : Promise.resolve(null);

        agentIdPromise
            .then(agentId => {
                const user = {
                    username: this.state.username,
                    password: this.state.password,
                    agentId: agentId,
                    admin: this.state.isAdmin
                };
                return this.props.id
                    ? apiPut('users', user, this.props.id)
                    : apiPost('users', user);
            })
            .then(() => window.location.hash = '#/admin/users')
            .catch(error => this.setState({ message: { message: error.message, type: 'danger' } }));
    }

    loadUser(id) {
        apiGet('users', id)
            .then(result => {
                this.setState(result);
                if (result.agentId) {
                    this.loadAgent(result.agentId);
                }
            })
            .catch(error => this.setState({ message: { message: error.message, type: 'danger' } }));
    }

    loadAgent(id) {
        apiGet('agents', id)
            .then(result => this.setState({ isAgent: true, agent: result }))
            .catch(error => this.setState({ message: { message: error.message, type: 'danger' } }));
    }
}
