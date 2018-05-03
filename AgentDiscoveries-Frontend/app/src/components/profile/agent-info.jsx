import * as React from 'react';

export default class AgentInfo extends React.Component {

    render() {
        return (
            <div>
                <h3>Agent Info</h3>
                <p>First Name: {this.props.agent.firstName}</p>
                <p>Last Name: {this.props.agent.lastName}</p>
                <p>Call Sign: {this.props.agent.callSign}</p>
                <p>Rank: {this.props.agent.rank}</p>
                <p>DOB: {this.props.agent.dateOfBirth}</p>
            </div>
        );
    }
}
