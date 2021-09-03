import { Grid, Typography } from '@material-ui/core';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Carousel from 'react-material-ui-carousel';

import Layout from '../components/Layout';
import ProductItem from '../components/product/ProductItem';
import db from '../config/db';
import Product from '../models/product';
import useStyles from '../utils/styles';

const Home = (props) => {
  const { products } = props;
  const classes = useStyles();
  return (
    <Layout>
      <>
        <Carousel className={classes.mt1} animation='slide'>
          <Image
            src='/images/banner2.png'
            alt='banner image'
            className={classes.featuredImage}
            width='1280'
            height='480'
          ></Image>
        </Carousel>
        <Typography variant='h2'>Popular Products</Typography>
        <Grid container spacing={3}>
          {products.map((product) => (
            <ProductItem product={product} key={product.name} />
          ))}
        </Grid>
      </>
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
