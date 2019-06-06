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
            ? <NavigationAuth cart={this.props.cart} />
            : <NavigationNonAuth cart={this.props.cart} />
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
      cart: this.props.cart,
    }
  }

  // to display the number of items in the cart
  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    console.log('prevProps.cart=', prevProps.cart);
    console.log('this.props.cart=', this.props.cart)
    if (prevProps.cart !== this.props.cart) {
      this.setState({
        cart: this.props.cart,
      });
      return true;
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
          <MDBNavLink to={ROUTES.LANDING}><img src="http://clipart-library.com/images/pco5nadxi.png" alt="logo" className="logo"/></MDBNavLink>
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
                <span>{this.state.cart}</span>
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
      cart: this.props.cart,
    }
  }

  // to display the number of items in the cart
  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    // console.log('prevProps.cart=', prevProps.cart);
    // console.log('this.props.cart=', this.props.cart)
    if (prevProps.cart !== this.props.cart) {
      this.setState({
        cart: this.props.cart,
      });
      return true;
    }
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  // function to highlight the routes in the navbar that the user is on
  handleHighlight = (event) => {
    // console.log(event.target.pathname)
    this.setState({ pathname: event.target.pathname });
  }


render() {
  // console.log('window.location.pathname=', window.location.pathname)
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
              <span>{this.state.cart}</span>
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
