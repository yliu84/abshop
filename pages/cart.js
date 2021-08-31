import React from 'react';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';
import Cart from '../components/Cart';

const CartScreen = () => {
  return (
    <Layout title='My Cart'>
      <Cart />
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
