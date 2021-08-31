import React from 'react';
import dynamic from 'next/dynamic';

import Layout from '../../components/Layout';
import Profile from '../../components/user/Profile';

const ProfileScreen = () => {
  return (
    <Layout title='Profile'>
      <Profile />
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(ProfileScreen), { ssr: false });
