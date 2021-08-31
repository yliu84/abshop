import React from 'react';
import dynamic from 'next/dynamic';

import db from '../../config/db';
import Product from '../../models/product';
import Layout from '../../components/Layout';
import ProductDetails from '../../components/product/ProductDetails';

const ProductScreen = (props) => {
  const { product } = props;

  if (!product) {
    return <div>Product Not Found</div>;
  }

  return (
    <Layout title={product.name} description={product.description}>
      <ProductDetails product={product} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}

export default dynamic(() => Promise.resolve(ProductScreen), { ssr: false });
