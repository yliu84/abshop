import React from 'react';
import dynamic from 'next/dynamic';

import Layout from '../../../components/Layout';
import Products from '../../../components/admin/Products';

const AdminProductsScreen = () => {
  return (
    <Layout title='Manage Products'>
      <Products />
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(AdminProductsScreen), {
  ssr: false,
});
