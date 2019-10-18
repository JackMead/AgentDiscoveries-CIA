import * as React from 'react';
import {Button, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';
import {apiGet, apiPost} from '../utilities/request-helper';
import {Messages} from '../message';
import ForumMessages from './forum-messages';

export default class Forum extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],

            Message: '',

            messages: []

        };

        this.onMessageChange = this.onMessageChange.bind(this);
        this.onPost = this.onPost.bind(this);

    }

    componentWillMount() {
        this.getLatestMessages();
    }

    getLatestMessages(){
        apiGet('forum')
            .then(results => this.setState({ posts: results.reverse() }))
            .catch(() => this.addMessage('Error fetching messages, please try again later', 'danger'));
    }

    render() {
        return (
            <div className='col-md-8 col-md-offset-2'>
                <Form onPost={this.onPost}>
                    <h3>Agent Forum</h3>

                    <ForumMessages forum={this.state.posts}/>

                    <Messages messages={this.state.messages}/>

                    <FormGroup>
                        <ControlLabel>Message Board</ControlLabel>
                        <FormControl type='text' required
                            maxLength = '255'
                            id='message-input'
                            componentClass='textarea' rows={6}
                            placeholder='Enter message'
                            value={this.state.Message}
                            onChange={this.onMessageChange}
                            className="resizeOff"/>
                    </FormGroup>

                    <Button id="post" type='submit' onClick={this.onPost}>Post</Button>
                </Form>
            </div>
        );
    }

    onMessageChange(event) {
        this.setState({ Message: event.target.value });
    }

    onPost(event) {
        event.preventDefault();

        //console.log(window.localStorage.getItem(""))

        const body = {
            Message: this.state.Message
            //Username: window.localStorage.getItem("Username")
        };

        apiPost('forum/add', body)
            .then(() => this.addMessage('Message submitted', 'info'))
            .catch(() => this.addMessage('Error submitting message, please try again later', 'danger'))
            .finally(() => {
                this.getLatestMessages();
                this.setState({Message: ''});
            });

    }

    addMessage(message, type) {
        this.setState(oldState => {
            return { messages: [{ message: message, type: type }] };
        });
    }
}
