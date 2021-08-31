import React from 'react';
import Layout from '../../components/Layout';
import Login from '../../components/auth/Login';

const LoginScreen = () => {
  return (
    <Layout title='login'>
      <Login />
    </Layout>
  );
};

export default LoginScreen;
