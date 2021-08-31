import React from 'react';
import Layout from '../components/Layout';
import Payment from '../components/checkout/Payment';

const PaymentScreen = () => {
  return (
    <Layout title='Select Payment'>
      <Payment />
    </Layout>
  );
};

export default PaymentScreen;
