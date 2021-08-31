import React from 'react';
import dynamic from 'next/dynamic';

import Layout from '../../components/Layout';
import OrderDetails from '../../components/order/OrderDetails';

const OrderScreen = ({ params }) => {
  const orderId = params.id;

  return (
    <Layout title={`Order ${orderId}`}>
      <OrderDetails orderId={orderId} />
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  return { props: { params } };
}

export default dynamic(() => Promise.resolve(OrderScreen), { ssr: false });
