import * as React from 'react';
import {ControlLabel, FormControl, FormGroup} from 'react-bootstrap';

export default class AdminForm extends React.Component {
    constructor(props) {
        super(props);

        this.onFirstNameUpdate = this.onUpdate.bind(this, 'firstName');
        this.onLastNameUpdate = this.onUpdate.bind(this, 'lastName');
        this.onDateOfBirthUpdate = this.onUpdate.bind(this, 'dateOfBirth');
        this.onRankUpdate = this.onUpdate.bind(this, 'rank');
        this.onCallSignUpdate = this.onUpdate.bind(this, 'callSign');
    }

    render() {
        return (
            <div className='ml-3'>
                <FormGroup>
                    <ControlLabel>First Name</ControlLabel>
                    <FormControl type='text' required
                        placeholder='Enter first name'
                        value={this.props.agent.firstName}
                        onChange={this.onFirstNameUpdate}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Last Name</ControlLabel>
                    <FormControl type='text' required
                        placeholder='Enter last name'
                        value={this.props.agent.lastName}
                        onChange={this.onLastNameUpdate}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Date Of Birth</ControlLabel>
                    <FormControl type='date' required
                        placeholder='Enter date of birth'
                        value={this.props.agent.dateOfBirth}
                        onChange={this.onDateOfBirthUpdate}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Rank</ControlLabel>
                    <FormControl type='number' required
                        placeholder='Enter numeric rank'
                        value={this.props.agent.rank}
                        onChange={this.onRankUpdate}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Call Sign</ControlLabel>
                    <FormControl type='text' required
                        placeholder='Enter call sign'
                        value={this.props.agent.callSign}
                        onChange={this.onCallSignUpdate}/>
                </FormGroup>
            </div>
        );
    }

    onUpdate(property, event) {
        const updated = Object.assign({}, this.props.agent);
        updated[property] = event.target.value;
        this.props.onUpdate(updated);
    }
}
