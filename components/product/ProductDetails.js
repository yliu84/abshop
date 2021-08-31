import React, { useContext, useState } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import {
  Link,
  Typography,
  Grid,
  List,
  ListItem,
  Button,
  Card,
  Select,
  MenuItem,
} from '@material-ui/core';

import useStyles from '../../utils/styles';
import { Store } from '../../utils/Store';
import { useRouter } from 'next/router';

const ProductDetails = ({ product }) => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const classes = useStyles();

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div>Product Not Found</div>;
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const final_quantity = existItem ? existItem.quantity + quantity : quantity;

    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.product.countInStock < final_quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity: final_quantity },
    });
    router.push('/cart');
  };

  return (
    <>
      <div className={classes.section}>
        <NextLink href='/' passHref>
          <Link>
            <Typography>Back to products</Typography>
          </Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item md={4} xs={12}>
          <Image
            src={product.images[0].url}
            alt={product.name}
            width={640}
            height={640}
            layout='responsive'
          ></Image>
        </Grid>
        <Grid item md={5} xs={12}>
          <List>
            <ListItem>
              <Typography component='h1' variant='h1'>
                {product.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {product.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand: {product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Rating: {product.rating} stars ({product.numReviews} reviews)
              </Typography>
            </ListItem>
            <ListItem>
              <Typography> Description: {product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>${product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Quantity</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Select
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <MenuItem key={x + 1} value={x + 1}>
                          {x + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant='contained'
                  color='primary'
                  onClick={addToCartHandler}
                >
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductDetails;
