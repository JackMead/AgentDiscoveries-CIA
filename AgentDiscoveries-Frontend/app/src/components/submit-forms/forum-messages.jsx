import * as React from 'react';

export default class ForumMessages extends React.Component {

    render() {
        return (
            <div>
                {
                    this.props.forum.map(message => <p key={message.MessageId}>{message.Message}</p>)
                }
            </div>
        );
    }
}