import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
// import { tsConstructSignatureDeclaration } from '@babel/types';

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

// in controlled components value cannot be equal to null (no <input value={null}), so empty string implies a controlled component
const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
}

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME)
      })
      .catch(error => {
        this.setState({ error })
      })

      event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <label htmlFor="username">
          <input
            id="username"
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Full Name"
          />
        </label>
        <label htmlFor="email">
          <input
            id="email"
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
        </label>
        <label htmlFor="passwordOne">
          <input
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
        </label>
        <label htmlFor="passwordTwo">
          <input
            id="passwordTwo"
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
          />
        </label>
        <button disabled={isInvalid} type="submit">Sign Up</button>

        {/* error objects from Firebase have the message property by default */}
        {error && <p>{error.message}</p>}
      </form>
    );
  };
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

// const SignUpForm = withRouter(withFirebase(SignUpFormBase)); -- we use recompose instead
// a function composition utility compose(f, g, h) is the same as (...args) => f(g(h(...args)))
const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase)


export default SignUpPage;

export { SignUpForm, SignUpLink }
