import React, { Component, Suspense, lazy } from 'react';

import { Product } from './Products';
import Products from './Products';
import Bicycle from '../Bicycle';



class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      // to display loading ring when fetching products from the database
      loading: false,
    };
  }

  // shouldComponentUpdate is needed to prevent re-rendering Landing page, eliminating unnecessary fetch request of bicycyles from the database
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.cart !== nextProps.cart) {
      return false;
    } else {
      return true;

    }
  }

  // fetch products when component mounts
  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    this.setState({ loading: true });
    // function to display loading ring (for demonstration purposes)
    const delay = t => new Promise(resolve => setTimeout(resolve, t))

    delay(1000)
    .then(() => fetch('https://cycle-heaven-api.herokuapp.com/products'))
    .then(response => response.json())
    // .then(resJSON => console.log(resJSON))
    .then(resJSON => this.setState({
      products: resJSON,
      loading: false,
    }))
    .catch(err => console.log(err));
  }

  render() {
    const { products } = this.state;
    console.log('products=', products);


    if (this.state.loading) {
      return (
        <div className="landing">
          {/*<Departments products={products} />*/}
          <Bicycle />
        </div>
      );
    } else {
      return (
        <div className="landing">
          {/*<Departments products={products} />*/}
          <Products products={products} handleAdd={this.props.handleAdd}/>
        </div>
      )
    }

  };
};


export default Landing;
export { Product };


// import styled from 'styled-components';
// import Ripples from 'react-ripples';

// import { storage } from 'firebase';
// import Products from './Products';

    // .then((responce) => {
    //   console.log('wait for 3 sec');
    //   function resolve(responce) {return responce}
    //   return new Promise(function(resolve) {
    //     setTimeout(() => {
    //       console.log('3 sec expired');
    //       resolve();
    //     }, 3000)
    //   })
    // })

// const Products = React.lazy(() => import('./Products'));

// counter to give each product that is added to cart a unique key
// let counter = 0;

// const Button = styled.button`
//   width: 100%;
//   cursor: pointer;
//   background: transparent;
//   font-size: 16px;
//   border-radius: 3px;
//   color: ${props => (props.primary ? 'violet' : 'palevioletred')};
//   border: ${props =>
//     props.primary ? '2px solid violet' : '2px solid palevioletred'};
//   margin-bottom: 1em;
//   padding: 0.25em 1em;
//   transition: 0.5s all ease-out;

//   &:hover {
//     color: white;
//     background-color: ${props =>
//       props.primary ? 'violet' : 'palevioletred'};
//   }

//   &:focus {outline:0;}

// `;

// let URI;

// if (process.env.NODE_ENV === 'production') {
//   URI = process.env.BASE_URI + '/products';
// } else {
//   URI = '/products'
// }

// console.log("URI=", URI);


// class Products extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       filterTextInput: '',
//       filterTextButton: '',
//     };
//   };

//   handleChange = event => {
//     this.setState({
//       filterTextInput: event.target.value,
//       filterTextButton: '',
//     });
//   };

//   handleClick = event => {
//     console.log(event.target.value);
//     this.setState({
//       filterTextInput: '',
//       filterTextButton: event.target.value,
//     })
//   }


//   render() {
//     let filteredList = [];
//     if (this.state.filterTextButton !== '') {
//       console.log('in it to win it')
//       filteredList = this.props.products.filter(
//         item => item.department.includes(this.state.filterTextButton))
//     } else {
//       filteredList = this.props.products.filter(
//         item => item.name.includes(this.state.filterTextInput)
//       )
//     }
//     return (
//       <React.Fragment>
//         <div className="departments">
//           <h2>Shop by department</h2>
//           <Ripples color="#fff" during={1200}>
//             <Button value="Road bicycles" onClick={event => this.handleClick(event)}>Road bicycles</Button>
//           </Ripples>
//           <Ripples color="#fff" during={1200}>
//             <Button value="Mountain bicycles" onClick={event => this.handleClick(event)}>Mountain bicycles</Button>
//           </Ripples>
//           <Ripples color="#fff" during={1200}>
//             <Button value="Touring bicycles" onClick={event => this.handleClick(event)}>Touring bicycles</Button>
//           </Ripples>
//           <Ripples color="#fff" during={1200}>
//             <Button value="" onClick={event => this.handleClick(event)}>All bicycles</Button>
//           </Ripples>
//         </div>

//         <div className="products">

//           <input value={this.state.filterTextInput} onChange={this.handleChange} placeholder="Search by bicycle brand"/>
//           {filteredList.map( product => <Product product={product} key={product.id} handleClick={this.props.handleAdd} buttonLabel={'Add to cart'}/>)}
//         </div>

//       </React.Fragment>
//     )
//   };
// };

// class Product extends Component {

//   render() {
//     const { product } = this.props;
//     // const buttonLabel = 'Add to cart'
//     return (
//       <div className="product">
//         <img src={product.img} alt="bicycle" />
//         <p className="name">{product.name} ({product.department})</p>
//         <p className="price">${product.price}</p>
//         <div className="cart_button">
//           <Ripples color="orange" during={1200}>
//             <button type="submit" onClick={event => this.props.handleClick(event, product)} className="add_to_cart_btn">{this.props.buttonLabel}</button>
//           </Ripples>

//         </div>

//         <p className="description">{product.description}</p>
//       </div>
//     )
//   };
// };



