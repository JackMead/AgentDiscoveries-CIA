import * as React from "react";
import { Alert } from "react-bootstrap"

export class Message extends React.Component {

    render() {
        if (this.props.message.message !== "") {

            return (
                <Alert bsStyle={this.props.message.type} className={`${this.props.message.type}-message`}>
                    {this.props.message ? this.props.message.message : ""}
                </Alert>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
};