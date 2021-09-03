import React from 'react';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';
import Shipping from '../components/checkout/Shipping';

const ShippingScreen = () => {
  return (
    <Layout title='Shipping Address'>
      <Shipping />
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(ShippingScreen), { ssr: false });
