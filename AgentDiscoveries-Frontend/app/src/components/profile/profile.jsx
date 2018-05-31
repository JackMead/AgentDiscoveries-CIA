import * as React from 'react';
import {Button, Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {apiGet} from '../utilities/request-helper';
import AgentInfo from './agent-info';
import EditProfilePicture from './edit-profile-picture';
import placeholderPicture from '../../../static/placeholder.jpg';
import {currentUserId} from '../utilities/user-helper';
import {errorLogAndRedirect} from '../error';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imgSrc: placeholderPicture,
            user: {},
            agent: {}
        };

        this.getProfilePicture = this.getProfilePicture.bind(this);
    }

    componentWillMount() {
        this.getProfilePicture();
        this.getUser();
    }

    render() {
        return (
            <div className='col-md-8 col-md-offset-2'>
                <h3>{this.state.user ? `Welcome ${this.state.user.username}` : '' }</h3>

                {this.state.agent.callSign ? (
                    <div className='col-md-6'>
                        <AgentInfo agent={this.state.agent} />
                        <Link to='/profile/edit/callsign'>
                            <Button type='button'>
                                Change Call Sign
                            </Button>
                        </Link>
                    </div>
                ) : ''}

                <div className='profile-img-container col-md-6'>
                    <Image className='img' src={this.state.imgSrc} />
                    <EditProfilePicture onSuccess={this.getProfilePicture}/>
                </div>
            </div>
        );
    }

    getProfilePicture() {
        apiGet('pictures', currentUserId())
            .then(response => response.blob())
            .then(blob => this.setState({imgSrc: URL.createObjectURL(blob)}))
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    this.setState({ imgSrc: placeholderPicture });
                } else {
                    throw error;
                }
            })
            .catch(errorLogAndRedirect);
    }

    getUser() {
        apiGet('users', currentUserId())
            .then(user => {
                this.setState({ user: user });
                if (user.agentId) {
                    this.getAgent(user.agentId);
                }
            })
            .catch(errorLogAndRedirect);
    }

    getAgent(agentId) {
        apiGet('agents', agentId)
            .then(agent => this.setState({ agent: agent }))
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    this.setState({ agent: {} });
                } else {
                    throw error;
                }
            })
            .catch(errorLogAndRedirect);
    }
}
