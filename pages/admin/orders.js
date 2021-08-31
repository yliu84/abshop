import React from 'react';
import dynamic from 'next/dynamic';

import Layout from '../../components/Layout';
import Orders from '../../components/admin/Orders';

const AdminOrdersScreen = () => {
  return (
    <Layout title='Manage Orders'>
      <Orders />
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(AdminOrdersScreen), {
  ssr: false,
});
