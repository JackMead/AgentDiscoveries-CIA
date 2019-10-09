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
            <center>

            <h3>{this.state.user ? `Welcome ${this.state.user.username}` : '' }</h3>
            <p>This is the CIA's secret website... create secret messages and add reports!!!!!</p>

            <table width="30%">
                <tr>
                    <th>Location:</th>
                    <th>Time:</th>
                </tr>
                <tr>
                    <td>Africa/Bamako</td>
                    <td><Clock format={'HH:mm:ss'} ticking={true} timezone={'Africa/Bamako'} /></td>
                </tr>
                <tr>
                    <td>America/Chihuahua</td>
                    <td><Clock format={'HH:mm:ss'} ticking={true} timezone={'America/Chihuahua'} /></td>
                </tr>
                <tr>
                    <td>America/New_York</td>
                    <td><Clock format={'HH:mm:ss'} ticking={true} timezone={'America/New_York'} /></td>
                </tr>
                <tr>
                    <td>Europe/Moscow</td>
                    <td><Clock format={'HH:mm:ss'} ticking={true} timezone={'Europe/Moscow'} /></td>
                </tr>
                <tr>
                    <td>Europe/London</td>
                    <td><Clock format={'HH:mm:ss'} ticking={true} timezone={'Europe/London'} /></td>
                </tr>
            </table>
            </center>
            </div>
        );
    }
}
