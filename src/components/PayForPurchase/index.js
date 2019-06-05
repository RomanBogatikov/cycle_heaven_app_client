import React from 'react';

import { withAuthorization } from '../Session';

const PayForPurchase = () => (
  <div>
    <h1>PayForPurchase</h1>
    <p>Select your payment method</p>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(PayForPurchase);
