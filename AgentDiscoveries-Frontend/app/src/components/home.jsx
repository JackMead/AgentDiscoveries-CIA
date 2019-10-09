import * as React from 'react';
import Clock from 'react-live-clock';
import {apiGet} from './utilities/request-helper';
import {currentUserId} from './utilities/user-helper';
import {errorLogAndRedirect} from './error';

export default class Home extends React.Component {
     constructor(props) {
            super(props);

            this.state = {
                user: {}
            };
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

    componentWillMount() {
            this.getUser();
        }

    render() {
        return (
            <div>
                <h3>{this.state.user ? `Welcome ${this.state.user.username}` : '' }</h3>
                <Clock format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} />
            </div>
        );
    }
}
