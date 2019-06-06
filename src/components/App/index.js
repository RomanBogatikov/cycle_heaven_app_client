import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import CartPage from '../Cart';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import StatisticsPage from '../Statistics';

import * as ROUTES from '../../constants/routes';
// import { withFirebase } from '../Firebase';
// import { AuthUserContext } from '../Session';
import { withAuthentication } from '../Session'
import PayForPurchase from '../PayForPurchase';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: '',
    }
  }

  componentDidMount() {
    let existingCart = JSON.parse(localStorage.getItem('ch_bikes'));
    console.log('existingCart=', existingCart);
    const numOfProductsInCart = existingCart.reduce( (accumulator, value) => {
      return accumulator+ value.quantity
    }, 0);
    this.setState({ cart: numOfProductsInCart });
  }

// function to add items to cart and to calculate number of items in cart
  handleAdd = (event, product) => {

    console.log('product=', product);
    // get existing data
    let existingCart = JSON.parse(localStorage.getItem('ch_bikes'));
    console.log('existing=', existingCart)
    if (existingCart === null) existingCart = [];
    const id = product.id;
    // find index of the product in localStorage array
    const index = existingCart.findIndex(product => product.id === id);
    // check if the product with the same id is already in the cart
    if (index !== -1) {
      // increase quantity
      existingCart[index].quantity = ++existingCart[index].quantity;
    } else {
      // else push a new product into an array and set its quantity to 1
      product.quantity = 1;
      existingCart.push(product);
    }

    localStorage.setItem('ch_bikes', JSON.stringify(existingCart));

    // product.cart_id = counter;
    // console.log('existing=', existingCart)

    const numOfProductsInCart = existingCart.reduce( (accumulator, product) => {
      return accumulator + product.quantity
    }, 0);

    // console.log('numofproductsincart=', numOfProductsInCart);

    this.setState({ cart: numOfProductsInCart });
  }

  // function to display the number of products in the cart after removing
  handleCartDisplayOnRemove = (number) => {
    // console.log('handleCartDisplayOnRemove', number)
    this.setState({ cart: number })
  }

  render() {
    // let existingCart = JSON.parse(localStorage.getItem('ch_bikes'));
    // const numOfProductsInCart = existingCart.reduce( (accumulator, value) => {
    //   return accumulator+ value.quantity
    // }, 0);
    return (
      // const App = () => (
      <Router>
        <div>
          <Navigation cart={this.state.cart}/>

          <Route exact path={ROUTES.LANDING} render={(props) => <LandingPage {...props} handleAdd={this.handleAdd} />}/>
          <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route exact path={ROUTES.CART} render={(props) => <CartPage {...props} handleCartDisplayOnRemove={this.handleCartDisplayOnRemove} />}/>
          <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route exact path={ROUTES.HOME} component={HomePage} />
          <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route exact path={ROUTES.ADMIN} component={AdminPage} />
          <Route exact path={ROUTES.PAYFORPURCHASE} component={PayForPurchase} />
          <Route exact path={ROUTES.STATISTICS} component={StatisticsPage} />
        </div>
      </Router>
      // );
    );
  };
};

export default withAuthentication(App);

