import * as React from "react";

import Navbar from "./navbar";
import Login from "./login";
import LocationReportSearch from "./search-forms/search-location-reports";
import LocationReportSubmit from "./submit-forms/submit-location-report";

export default class Test extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Navbar />
                <Login />
                <LocationReportSearch />
                <LocationReportSubmit />
            </div>
        );
    }

    moveToNextMessage() {
        const newMessageId = (this.state.messageId + 1) % messages.length;
        this.setState({messageId: newMessageId});
    }
};