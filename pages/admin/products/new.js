import React from 'react';
import dynamic from 'next/dynamic';

import Layout from '../../../components/Layout';
import NewProduct from '../../../components/admin/NewProduct';

const AdminNewProductScreen = () => {
  return (
    <Layout title='New Product'>
      <NewProduct />
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(AdminNewProductScreen), {
  ssr: false,
});
