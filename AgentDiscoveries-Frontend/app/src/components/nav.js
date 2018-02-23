import * as React from "react"
import {
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem
} from "react-bootstrap"
import {Link} from "react-router-dom"
import { logOut, isLoggedIn } from "./user/user-utilities"

export default class NavigationBar extends React.Component {

    componentWillMount() {
        this.setAuthenticationElement()
    }

    componentDidMount() {
        window.addEventListener("login", this.setAuthenticationElement.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener("login", this.setAuthenticationElement.bind(this))
    }

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
                        <NavItem componentClass={Link} href="/message" to="/message" eventKey={4}>Today's Message</NavItem>
                        <NavDropdown eventKey={5} title="Admin" id="basic-nav-dropdown">
                            <MenuItem componentClass={Link} href="/admin/add-entity" to="/admin/add-entity" eventKey={5.1}>Add Entity</MenuItem>
                            <NavDropdown eventKey={5.1} title="View Entities" id="basic-nav-dropdown">
                                <MenuItem componentClass={Link} href="/admin/entities/locations" to="/admin/entities/locations" eventKey={5.11}>Locations</MenuItem>
                                <MenuItem componentClass={Link} href="/admin/entities/regions" to="/admin/entities/regions" eventKey={5.12}>Regions</MenuItem>
                                <MenuItem componentClass={Link} href="/admin/entities/users" to="/admin/entities/users" eventKey={5.13}>Users</MenuItem>
                            </NavDropdown>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        {this.state.authenticationElement}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }

    handleLogOut(e) {
        e.preventDefault()
        logOut()
        window.dispatchEvent(new CustomEvent('login'))
        window.location.hash = "#/"
    }

    setAuthenticationElement() {
        if (isLoggedIn()) {
            var authenticationElement =  (
                <NavItem onClick={this.handleLogOut.bind(this)} href="/login" to="/login" eventKey={1}>
                    Log Out
                </NavItem>
            )
        } else {
            var authenticationElement = (
                <NavItem componentClass={Link} href="/login" to="/login" eventKey={1}>
                    Login
                </NavItem>
            )
        }
        this.setState({authenticationElement: authenticationElement})
    }
}
