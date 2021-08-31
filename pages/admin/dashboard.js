import React from 'react';
import dynamic from 'next/dynamic';

import Layout from '../../components/Layout';
import DashBoard from '../../components/admin/DashBoard';

const DashBoardScreen = () => {
  return (
    <Layout title='Dashboard'>
      <DashBoard />
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(DashBoardScreen), { ssr: false });
