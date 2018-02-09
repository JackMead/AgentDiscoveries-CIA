import * as React from "react";

import Navbar from "./navbar";
import Login from "./login";
import ApiSearch from "./apisearch";
import ApiSubmitReport from "./apisubmit-report";

export default class Test extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Navbar />
                <Login />
                <ApiSearch />
                <ApiSubmitReport />
            </div>
        );
    }

    moveToNextMessage() {
        const newMessageId = (this.state.messageId + 1) % messages.length;
        this.setState({messageId: newMessageId});
    }
};