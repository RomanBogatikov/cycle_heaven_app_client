import React, { Component } from 'react';
import styled from 'styled-components';
import Ripples from 'react-ripples';

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
    // console.log('this.props.products=', this.props.products)
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
          {filteredList.map( product => <Product product={product} key={product.id} handleClick={this.props.handleAdd} buttonLabel={'Add to cart'}/>)}
        </div>
      </React.Fragment>
    )
  };
};

class Product extends Component {

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

export default Products;
export { Product };
