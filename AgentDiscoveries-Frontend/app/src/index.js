require("../sass/styles.scss"); // Import so that webpack loads all of the sass

import * as React from "react";
import * as ReactDOM from "react-dom";

import Test from "./components/test";

ReactDOM.render(
    <Test />,
    document.getElementById("react-root")
);