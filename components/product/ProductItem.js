import React, { useContext } from 'react';
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import NextLink from 'next/link';
import axios from 'axios';
import { Store } from '../../utils/Store';
import useStyles from '../../utils/styles';

const ProductItem = ({ product }) => {
  const { state, dispatch } = useContext(Store);
  const classes = useStyles();

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.product.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }

    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity: quantity },
    });
  };

  return (
    <Grid item md={3} sm={4} xs={6} key={product.name}>
      <Card>
        <NextLink href={`/product/${product._id}`} passHref>
          <CardActionArea>
            <CardMedia
              component='img'
              image={product.images[0].url}
              title={product.name}
            ></CardMedia>
            <CardContent>
              <Typography>{product.name}</Typography>
              <Rating value={product.ratings} readOnly></Rating>
            </CardContent>
          </CardActionArea>
        </NextLink>
        <CardActions className={classes.productItemActions}>
          <Typography>${product.price}</Typography>
          <Button size='small' color='primary' onClick={addToCartHandler}>
            <AddShoppingCartIcon />
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductItem;
