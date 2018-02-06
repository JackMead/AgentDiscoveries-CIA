import * as React from "react";

const messages = [
    "Hello!",
    "You clicked it...",
    "You clicked it again!",
    "Alright that's enough"
];

export default class Test extends React.Component {
    constructor() {
        super();
        this.state = {messageId: 0};
    }

    render() {
        return (
            <div>
                <h1>{messages[this.state.messageId]}</h1>
                <button onClick={() => this.moveToNextMessage()}>
                    {this.state.messageId !== 3 ? "Don't Click Here" : "Sorry!"}
                </button>
            </div>
        );
    }

    moveToNextMessage() {
        const newMessageId = (this.state.messageId + 1) % messages.length;
        this.setState({messageId: newMessageId});
    }
};