import * as React from 'react';
// import {currentUserId} from './utilities/user-helper';

export default class ForumMessages extends React.Component {

    render() {

        return (
            <React.Fragment>
                <div>
                    {
                        this.props.forum.map(message => <div key={message.MessageId} className={'messageBox'}><p
                            className={'messageText'}> {message.Message}</p> <p className={'sender'}> {message.user} </p></div>)
                    }
                </div>
            </React.Fragment>
        );
    }
}