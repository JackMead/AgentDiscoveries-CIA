require("../sass/styles.scss"); // Import so that webpack loads all of the sass

import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./components/app";

ReactDOM.render(
    <App />,
    document.getElementById("react-root")
);
