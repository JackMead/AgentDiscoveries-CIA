import * as React from "react";

export class ErrorMessage extends React.Component {

    render() {
        return (
            <div className="error-message">
                {this.props.errorMessage.toString() ? this.props.errorMessage.toString() : ""}
            </div>
        );
    }
};