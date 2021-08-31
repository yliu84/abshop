import React from 'react';
import dynamic from 'next/dynamic';

import Layout from '../../../components/Layout';
import EditProduct from '../../../components/admin/EditProduct';

const AdminEditProductScreen = ({ params }) => {
  const productId = params.id;

  return (
    <Layout title='Edit Product'>
      <EditProduct productId={productId} />
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  return {
    props: { params },
  };
}

export default dynamic(() => Promise.resolve(AdminEditProductScreen), {
  ssr: false,
});
