import React from 'react';
import dynamic from 'next/dynamic';

import Layout from '../../../components/Layout';
import Users from '../../../components/admin/Users';

const AdminUsersScreen = () => {
  return (
    <Layout title='Manage Users'>
      <Users />
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(AdminUsersScreen), {
  ssr: false,
});
