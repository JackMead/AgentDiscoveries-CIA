import * as React from 'react';
import { Alert } from 'react-bootstrap';

export default class Message extends React.Component {
    render() {
        if (this.props.message.message) {
            return (
                <Alert bsStyle={this.props.message.type} className={`${this.props.message.type}-message`}>
                    {this.props.message.message}
                </Alert>
            );
        } else {
            return (
                <div />
            );
        }
    }
}

export class Messages extends React.Component {
    render() {
        return this.props.messages.map((message, i) => <Message key={i} message={message}/>);
    }
}
