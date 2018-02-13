import * as React from "react";
import {
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem
} from "react-bootstrap";
import {Link} from "react-router-dom";

export default class NavigationBar extends React.Component {
    render() {
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">
                            <span>
                                <img className="agent-discoveries-logo" src={require("../../static/agent.png")} alt="Agent Discoveries" />
                            </span>
                            <span>Agent Discoveries</span>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavDropdown eventKey={2} title="Search" id="basic-nav-dropdown">
                            <MenuItem componentClass={Link} href="/search/location" to="/search/location" eventKey={2.1}>Location Reports</MenuItem>
                            <MenuItem componentClass={Link} href="/search/region" to="/search/region" eventKey={2.2}>Region Summaries</MenuItem>
                        </NavDropdown>
                        <NavDropdown eventKey={3} title="Submit" id="basic-nav-dropdown">
                            <MenuItem componentClass={Link} href="/submit/location" to="/submit/location" eventKey={3.1}>Location Report</MenuItem>
                            <MenuItem componentClass={Link} href="/submit/region" to="/submit/region" eventKey={3.2}>Region Summary</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavItem componentClass={Link} href="/login" to="/login" eventKey={1}>
                            Login
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
};
