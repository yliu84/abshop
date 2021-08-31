import React from 'react';
import dynamic from 'next/dynamic';

import Layout from '../../../components/Layout';
import EditUser from '../../../components/admin/EditUser';

const AdminEditUserScreen = ({ params }) => {
  const userId = params.id;

  return (
    <Layout title='Edit User'>
      <EditUser userId={userId} />
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  return {
    props: { params },
  };
}

export default dynamic(() => Promise.resolve(AdminEditUserScreen), {
  ssr: false,
});
