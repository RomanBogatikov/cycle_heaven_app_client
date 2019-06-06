import React, { Component } from 'react';
import styled from 'styled-components';
import Ripples from 'react-ripples';
import { storage } from 'firebase';

// counter to give each product that is added to cart a unique key
let counter = 0;

const Button = styled.button`
  width: 100%;
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: ${props => (props.primary ? 'violet' : 'palevioletred')};
  border: ${props =>
    props.primary ? '2px solid violet' : '2px solid palevioletred'};
  margin-bottom: 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;

  &:hover {
    color: white;
    background-color: ${props =>
      props.primary ? 'violet' : 'palevioletred'};
  }

  &:focus {outline:0;}

`;

let URI;

if (process.env.NODE_ENV === 'production') {
  URI = process.env.BASE_URI + '/products';
} else {
  URI = '/products'
}

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.getProducts();
    // counter = JSON.parse(localStorage.getItem('ch_bikes')).length;
  }

  getProducts() {
    fetch(URI)
    .then(response => response.json())
    // .then(resJSON => console.log(resJSON))
    .then(resJSON => this.setState({
      products: resJSON,
    }));
  }

  render() {
    const { products } = this.state;
    return (
      <div className="landing">
        {/*<Departments products={products} />*/}
        <Products products={products} />
      </div>
    );
  };
};


// class Departments extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       products: this.props.products,
//     }
//   }

//   handleClick = (event) => {
//     this.setState({
//       products: this.props.products.filter( product => product.department ===  event.target.value)
//     })
//   }

//   render() {
//     return (
//       <div className="departments">
//       Shop by Department
//         <input type="submit" value="Road Bicycles" onClick={ event => this.handleClick(event)}/>
//         <input type="submit" value="Mountain Bicycles"/>
//         <input type="submit" value="Touring Bicycles"/>
//       </div>
//     )
//   };
// };

class Products extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterTextInput: '',
      filterTextButton: '',
    };
  };

  handleChange = event => {
    this.setState({
      filterTextInput: event.target.value,
      filterTextButton: '',
    });
  };

  handleClick = event => {
    console.log(event.target.value);
    this.setState({
      filterTextInput: '',
      filterTextButton: event.target.value,
    })
  }

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
    console.log('existing=', existingCart)
    // // increase counter to give a unique cart_id to the next product moved to cart
    // counter++;
  }

  render() {
    let filteredList = [];
    if (this.state.filterTextButton !== '') {
      console.log('in it to win it')
      filteredList = this.props.products.filter(
        item => item.department.includes(this.state.filterTextButton))
    } else {
      filteredList = this.props.products.filter(
        item => item.name.includes(this.state.filterTextInput)
      )
    }
    return (
      <React.Fragment>
        <div className="departments">
          <h2>Shop by department</h2>
          <Ripples color="#fff" during={1200}>
            <Button value="Road bicycles" onClick={event => this.handleClick(event)}>Road bicycles</Button>
          </Ripples>
          <Ripples color="#fff" during={1200}>
            <Button value="Mountain bicycles" onClick={event => this.handleClick(event)}>Mountain bicycles</Button>
          </Ripples>
          <Ripples color="#fff" during={1200}>
            <Button value="Touring bicycles" onClick={event => this.handleClick(event)}>Touring bicycles</Button>
          </Ripples>
          <Ripples color="#fff" during={1200}>
            <Button value="" onClick={event => this.handleClick(event)}>All bicycles</Button>
          </Ripples>
        </div>

        <div className="products">

          <input value={this.state.filterTextInput} onChange={this.handleChange} placeholder="Search by bicycle brand"/>
          {filteredList.map( product => <Product product={product} key={product.id} handleClick={this.handleAdd} buttonLabel={'Add to cart'}/>)}
        </div>

      </React.Fragment>
    )
  };
};

class Product extends Component {
// const Product = (props) => {
  // function to add product to cart (write to locasStorage and on Cart componentDidMount retrieve them)
  // handleClick = (event, product) => {
  //   console.log('product=', product);
  //   // get existing data
  //   let existingCart = JSON.parse(localStorage.getItem('ch_bikes'));
  //   console.log('existing=', existingCart)
  //   if (existingCart === null) existingCart = [];
  //   existingCart.push(product);
  //   console.log('existing=', existingCart)
  //   localStorage.setItem('ch_bikes', JSON.stringify(existingCart));
  // }

  render() {
    const { product } = this.props;
    // const buttonLabel = 'Add to cart'
    return (
      <div className="product">
        <img src={product.img} alt="bicycle" />
        <p className="name">{product.name} ({product.department})</p>
        <p className="price">${product.price}</p>
        <div className="cart_button">
          <Ripples color="orange" during={1200}>
            <button type="submit" onClick={event => this.props.handleClick(event, product)} className="add_to_cart_btn">{this.props.buttonLabel}</button>
          </Ripples>

        </div>

        <p className="description">{product.description}</p>
      </div>
    )
  };
};

export default Landing;
export { Product };
