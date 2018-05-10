import * as React from 'react';
import Message from './message';

export function errorLogAndRedirect(error) {
    console.error('Unexpected error', error);
    window.location.hash('#/error');
}

export default class Error extends React.Component {
    render() {
        return (
            <Message message={{message: 'An unexpected error occurred, please try again later', type: 'danger'}}/>
        );
    }
}
