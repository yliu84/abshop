import React from 'react';
import Layout from '../components/Layout';
import PlaceOrder from '../components/checkout/PlaceOrder';

const PlaceOrderScreen = () => {
  return (
    <Layout title='Place Order'>
      <PlaceOrder />
    </Layout>
  );
};

export default PlaceOrderScreen;
