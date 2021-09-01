import { Grid } from '@material-ui/core';
import dynamic from 'next/dynamic';

import Layout from '../components/Layout';
import ProductItem from '../components/product/ProductItem';
import db from '../config/db';
import Product from '../models/product';

const Home = (props) => {
  const { products } = props;
  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {products.map((product) => (
            <ProductItem product={product} key={product.name} />
          ))}
        </Grid>
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}, '-reviews').lean();
  await db.disconnect();

  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });
