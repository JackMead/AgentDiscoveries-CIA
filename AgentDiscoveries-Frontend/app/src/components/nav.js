import * as React from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem
} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {logOut, isLoggedIn, isAdmin} from './user/user-utilities';

export default class NavigationBar extends React.Component {
  constructor() {
    super();
    this.setNavOptions = this.setNavOptions.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentWillMount() {
    this.setNavOptions();
  }

  componentDidMount() {
    window.addEventListener('login', this.setNavOptions);
  }

  componentWillUnmount() {
    window.removeEventListener('login', this.setNavOptions);
  }

  render() {
    return (
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>
              <span>
                <img className='agent-discoveries-logo' src={require('../../static/agent.png')}
                     alt='Agent Discoveries'/>
              </span>
                <span>Agent Discoveries</span>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          {this.state.navOptions}
        </Navbar>
    );
  }

  handleLogOut(e) {
    e.preventDefault();
    logOut();
    window.dispatchEvent(new CustomEvent('login'));
    window.location.hash = '#/';
  }

  setNavOptions() {
    let navBarStandard;
    let navBarAdmin;
    let loginBar;
    if (isLoggedIn()) {
      if(isAdmin()) {
        navBarAdmin = (
            <Nav>
              <NavDropdown eventKey={2} title='Admin' id='basic-nav-dropdown'>
                <MenuItem componentClass={Link} href='/admin/locations' to='/admin/locations'
                          eventKey={2.1}>Locations</MenuItem>
                <MenuItem componentClass={Link} href='/admin/regions' to='/admin/regions'
                          eventKey={2.2}>Regions</MenuItem>
                <MenuItem componentClass={Link} href='/admin/users' to='/admin/users' eventKey={2.3}>Users</MenuItem>
              </NavDropdown>
              <NavDropdown eventKey={3} title='Search' id='basic-nav-dropdown'>
                <MenuItem componentClass={Link} href='/search/location' to='/search/location' eventKey={3.1}>Location
                  Reports</MenuItem>
                <MenuItem componentClass={Link} href='/search/region' to='/search/region' eventKey={3.2}>Region
                  Summaries</MenuItem>
              </NavDropdown>
            </Nav>
        );
      }
      loginBar = (
          <Nav pullRight>
            <NavItem componentClass={Link} href='/profile' to='/profile' eventKey={6}>Profile</NavItem>
            <NavItem onClick={this.handleLogOut} href='/login' to='/login' eventKey={1}>
              Log Out
            </NavItem>
          </Nav>
      );
      navBarStandard = (
          <Nav>
            <NavDropdown eventKey={4} title='Submit' id='basic-nav-dropdown'>
              <MenuItem componentClass={Link} href='/submit/location' to='/submit/location' eventKey={4.1}>Location
                Report</MenuItem>
              <MenuItem componentClass={Link} href='/submit/region' to='/submit/region' eventKey={4.2}>Region
                Summary</MenuItem>
            </NavDropdown>
            <NavItem componentClass={Link} href='/message' to='/message' eventKey={5}>Today's Message</NavItem>
          </Nav>
      );
    } else {
      loginBar = (
          <Nav pullRight>
            <NavItem componentClass={Link} href='/login' to='/login' eventKey={1}>
              Login
            </NavItem>
          </Nav>
      );
    }
    let navOptions = (
        <Navbar.Collapse>
          {navBarAdmin}
          {navBarStandard}
          {loginBar}
        </Navbar.Collapse>
    )
    this.setState({navOptions: navOptions});
  }
}



