import * as React from 'react';
import Clock from 'react-live-clock';
import {apiGet} from './utilities/request-helper';
import {currentUserId} from './utilities/user-helper';
import {errorLogAndRedirect} from './error';
import {Table} from 'react-bootstrap';
import momentTZ from 'moment-timezone';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            timeZonesList: momentTZ.tz.names()
        };
    }

    getUser() {
        apiGet('users', currentUserId())
            .then(user => {
                this.setState({ user: user });
            })
            .catch(errorLogAndRedirect);
    }

    componentWillMount() {
        this.getUser();
    }

    render() {
        return (
            <div>
                <Table className = "align-properly">
                    <thead>
                        <tr>
                            <th className = "align-properly motto"><h1>{this.state.user ? `Welcome, ${this.state.user.username}` : '' }</h1></th>
                            <th><img className = "cia-logo" src = "https://upload.wikimedia.org/wikipedia/commons/2/25/Seal_of_the_Central_Intelligence_Agency.svg"/></th>
                        </tr>
                    </thead>
                </Table>
                <p className ="motto">The work of a nation. The center of intelligence.</p>
                <div className = "table-wrapper-scroll-y my-custom-scrollbar">
                    <Table striped bordered className = "mb-0">
                        <thead>
                            <tr>
                                <th>Location:</th>
                                <th>Time:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.timeZonesList.map(this.renderTimeZone)}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }

    renderTimeZone(timeZone, index){
        return (
            <tr key = {index}>
                <td key = {index}>{timeZone}</td>
                <td><Clock format={'HH:mm:ss'} ticking={true} timezone={timeZone} /></td>
            </tr>
        );
    }
}