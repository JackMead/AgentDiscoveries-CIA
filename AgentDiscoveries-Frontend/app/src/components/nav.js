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
    constructor() {
        super()
        this.setNavOptions = this.setNavOptions.bind(this)
        this.handleLogOut = this.handleLogOut.bind(this)
    }

    componentWillMount() {
        this.setNavOptions()
    }

    componentDidMount() {
        window.addEventListener("login", this.setNavOptions)
    }

    componentWillUnmount() {
        window.removeEventListener("login", this.setNavOptions)
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
                {this.state.navOptions}
            </Navbar>
        )
    }

    handleLogOut(e) {
        e.preventDefault()
        logOut()
        window.dispatchEvent(new CustomEvent('login'))
        window.location.hash = "#/"
    }

    setNavOptions() {
        if (isLoggedIn()) {
            var navOptions = (
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
                        <MenuItem componentClass={Link} href="/admin/locations" to="/admin/locations" eventKey={5.1}>Locations</MenuItem>
                        <MenuItem componentClass={Link} href="/admin/regions" to="/admin/regions" eventKey={5.1}>Regions</MenuItem>
                        <MenuItem componentClass={Link} href="/admin/users" to="/admin/users" eventKey={5.1}>Users</MenuItem>
                    </NavDropdown>
                    <NavItem componentClass={Link} href="/profile" to="/profile" eventKey={6}>Profile</NavItem>
                </Nav>
                <Nav pullRight>
                    <NavItem onClick={this.handleLogOut} href="/login" to="/login" eventKey={1}>
                        Log Out
                    </NavItem>
                </Nav>
            </Navbar.Collapse> 
            )
        } else {
            var navOptions = (
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem componentClass={Link} href="/login" to="/login" eventKey={1}>
                            Login
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            )
        }
        this.setState({navOptions: navOptions})
    }
}
