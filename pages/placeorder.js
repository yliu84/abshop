import React from 'react';
import dynamic from 'next/dynamic';

import Layout from '../components/Layout';
import PlaceOrder from '../components/checkout/PlaceOrder';

const PlaceOrderScreen = () => {
  return (
    <Layout title='Place Order'>
      <PlaceOrder />
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(PlaceOrderScreen), { ssr: false });
