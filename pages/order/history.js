import React from 'react';
import dynamic from 'next/dynamic';

import Layout from '../../components/Layout';
import OrderHistory from '../../components/order/OrderHistory';

const HistoryScreen = () => {
  return (
    <Layout title='Order history'>
      <OrderHistory />
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(HistoryScreen), { ssr: false });
