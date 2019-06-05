import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import { Product } from '../Landing';

const CartPage = () => (
  <React.Fragment>
    <h1>Cart</h1>
    <Cart />
    <CheckoutForm />
  </React.Fragment>
)

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // state is needed to display fetched items from the cart table
      products: [],
    }
  }

  componentDidMount() {
    this.getProducts();
    console.log('window.location=', window.location)
  }

  // componentWillUnmount() {
  //   localStorage.setItem('ch_bikes', JSON.stringify(this.state.products))
  // }

  getProducts() {
    let products = JSON.parse(localStorage.getItem('ch_bikes'));
    if (products === null) return;
    console.log('products in cart=', products);
    this.setState({
      products: products,
    })
  }

  // function to remove items from cart (from localStorage)
  handleRemove = (event, product) => {
    console.log('in it to win it');
    const id = product.id;
    let existingCart = JSON.parse(localStorage.getItem('ch_bikes'));
    console.log('existing=', existingCart)
    // if (existingCart === null) existingCart = [];
    const filteredCart = existingCart.filter(product => product.id !== id);
    // find index of a product in localStorage to remove
    // const index = existingCart.findIndex(product => product.id === id);
    // console.log('index=', index);

    // remove element from existingCart (splice modifies in place), cart_id is a unique key for each product in the cart that corresponds to product index in the state array
    // existingCart.splice(product.cart_id, 1, null);
    // this.setState(prevState => {
      //   const index = prevState.products.findIndex(product => product.id === id);
      //   prevState.products.splice(index, 1);
      //   return prevState;
      // })

    // change state to not render removed product
    this.setState(prevState => ({
        products: prevState.products.filter(product => product.id !== id)
      })
    )

    // save new array to localStorage
    localStorage.setItem('ch_bikes', JSON.stringify(filteredCart));

  }

  // render fetched cart here
  render() {
    const { products } = this.state;
    return (
      /*
      <div className="products">
        {products.map(product => (
          <Product
            product={product}
            key={product.cart_id}
            handleClick={(event) => this.handleRemove(event, product)}
            buttonLabel={'Remove from cart'}
          />
          )
        )}
      </div>
      */

      <div className="products">
        {products.map(product => (
          <div className="product" key={product.id}>
            <img src={product.img} alt="#" />
            <p className="name">{product.name}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Price for {product.quantity} item(s): ${product.price * product.quantity}</p>
            <button type="submit" onClick={event => this.handleRemove(event, product)}>Remove from cart</button>
            {/*<p>{product.description}</p>*/}
          </div>
        ))}
      </div>

    )
  };
};

class CheckoutFormBase extends Component {
  handleSubmit = event => {
    event.preventDefault();
    // redirect to /payforpurchase
    this.props.history.push(ROUTES.PAYFORPURCHASE);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <button type="submit">Check Out</button>
      </form>
    )
  }
}

const CheckoutForm = withRouter(CheckoutFormBase);

export default CartPage;
