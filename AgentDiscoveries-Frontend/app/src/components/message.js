import * as React from "react";

export class Message extends React.Component {

    render() {
        return (
            <div className={`${this.props.message.type}-message`}>
                {this.props.message ? this.props.message.message : ""}
            </div>
        );
    }
};