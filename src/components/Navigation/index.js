import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";


import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes'
import { AuthUserContext } from '../Session';


// const Navigation = () => (
//   <div className="navbar">
//     <span className="navbar-toggle" id="js-navbar-toggle">
//       <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
//     </span>
//     <a href="/#" className="logo">logo</a>
//     <AuthUserContext.Consumer>
//     {authUser =>
//       authUser
//         ? <NavigationAuth />
//         : <NavigationNonAuth />
//     }
//     </AuthUserContext.Consumer>
//   </div>
// );


// const NavigationAuth = () => (
//   <React.Component>
//     <ul className="main-nav" id="js-menu">
//       <li>
//         <Link to={ROUTES.LANDING} className="nav-links">Landing</Link>
//       </li>
//       <li>
//         <Link to={ROUTES.HOME} className="nav-links">Home</Link>
//       </li>
//       <li>
//         <Link to={ROUTES.ACCOUNT} className="nav-links">Account</Link>
//       </li>
//       <li>
//         <Link to={ROUTES.ADMIN} className="nav-links">Admin</Link>
//       </li>
//       <li>
//         <SignOutButton />
//       </li>
//       <li>
//         <Link to={ROUTES.CART} className="nav-links">Cart</Link>
//       </li>
//     </ul>

//   </React.Component>
// );

// const NavigationNonAuth = () => (
//   <ul className="main-nav" id="js-menu">
//     <li>
//       <Link to={ROUTES.LANDING} className="nav-links">Landing</Link>
//     </li>
//     <li>
//       <Link to={ROUTES.CART} className="nav-links">Cart</Link>
//     </li>
//     <li>
//       <Link to={ROUTES.SIGN_IN} className="nav-links">Sign In</Link>
//     </li>
//   </ul>
// )

class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      pathname: '/',
    };
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser =>
          authUser
            ? <NavigationAuth />
            : <NavigationNonAuth />
        }
      </AuthUserContext.Consumer>
    );
  }
}

class NavigationAuth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleHighlight = (event) => {
    console.log(event.target.pathname)
    this.setState({ pathname: event.target.pathname });
  }


  render() {
    return (
      <MDBNavbar color="default-color" dark expand="md">

        <MDBNavbarBrand>
          <strong className="white-text">LOGO</strong>
        </MDBNavbarBrand>

        <MDBNavbarToggler onClick={this.toggleCollapse} />

        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active={this.state.pathname === '/'} onClick = {(event)=> this.handleHighlight(event)}>
              <MDBNavLink to={ROUTES.LANDING}>Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem active={this.state.pathname === '/home'} onClick = {(event)=> this.handleHighlight(event)}>
              <MDBNavLink to={ROUTES.HOME}>Special</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem active={this.state.pathname === '/statistics'} onClick = {(event)=> this.handleHighlight(event)}>
              <MDBNavLink to={ROUTES.STATISTICS}>Statistics</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem active={this.state.pathname === '/cart'} onClick = {(event)=> this.handleHighlight(event)}>
              <MDBNavLink to={ROUTES.CART}>Cart</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>

          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to={ROUTES.CART}>
                <MDBIcon icon="shopping-cart" />
              </MDBNavLink>
            </MDBNavItem>

            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" />
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href={ROUTES.ACCOUNT}>Account</MDBDropdownItem>
                  <MDBDropdownItem href={ROUTES.ADMIN}>Admin</MDBDropdownItem>
                  {/*<MDBDropdownItem href="">Sign Out</MDBDropdownItem>*/}
                  <SignOutButton/>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>

        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

class NavigationNonAuth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      pathname: '/',
    }
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleHighlight = (event) => {
    console.log(event.target.pathname)
    this.setState({ pathname: event.target.pathname });
  }


render() {
  console.log('window.location.pathname=', window.location.pathname)
  return (
    <MDBNavbar color="default-color" dark expand="md">
      <MDBNavbarBrand>
        <MDBNavLink to={ROUTES.LANDING}><img src="http://clipart-library.com/images/pco5nadxi.png" alt="logo" className="logo"/></MDBNavLink>
      </MDBNavbarBrand>

      <MDBNavbarToggler onClick={this.toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
        <MDBNavbarNav left>
          <MDBNavItem active={this.state.pathname === '/'} onClick = {(event)=> this.handleHighlight(event)}>
            <MDBNavLink to={ROUTES.LANDING}>Home</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem active={this.state.pathname === '/statistics'} onClick = {(event)=> this.handleHighlight(event)}>
            <MDBNavLink to={ROUTES.STATISTICS}>Statistics</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem active={this.state.pathname === '/cart'} onClick = {(event)=> this.handleHighlight(event)}>
            <MDBNavLink to={ROUTES.CART}>Cart</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>

        <MDBNavbarNav right>
          <MDBNavItem>
            <MDBNavLink className="waves-effect waves-light" to={ROUTES.CART}>
              <MDBIcon icon="shopping-cart" />
            </MDBNavLink>
          </MDBNavItem>

          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <MDBIcon icon="user" />
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-default">
                <MDBDropdownItem href={ROUTES.SIGN_IN}>Sign In</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>

        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
    );
  }
}

export default Navigation;
