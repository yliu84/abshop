import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { useRouter } from 'next/router';
import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { Pagination } from '@material-ui/lab';

import useStyles from '../utils/styles';
import ProductItem from './product/ProductItem';

const prices = [
  {
    name: '$1 to $50',
    value: '1-50',
  },
  {
    name: '$51 to $200',
    value: '51-200',
  },
  {
    name: '$201 to $1000',
    value: '201-1000',
  },
];

const ratingGroup = [1, 2, 3, 4, 5];

const Search = ({ products, countProducts, categories, brands, pages }) => {
  const classes = useStyles();
  const router = useRouter();

  const {
    query = 'all',
    category = 'all',
    brand = 'all',
    price = 'all',
    ratings = 'all',
    sort = 'featured',
  } = router.query;

  const filterSearch = ({
    page,
    category,
    brand,
    sort,
    min,
    max,
    searchQuery,
    price,
    ratings,
  }) => {
    const path = router.pathname;
    const { query } = router;

    if (page) query.page = page;
    if (searchQuery) query.searchQuery = searchQuery;
    if (sort) query.sort = sort;
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (price) query.price = price;
    if (ratings) query.ratings = ratings;
    if (min) query.min ? query.min : query.min === 0 ? 0 : min;
    if (max) query.max ? query.max : query.max === 0 ? 0 : max;

    router.push({
      pathname: path,
      query: query,
    });
  };

  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value });
  };
  const pageHandler = (e, page) => {
    filterSearch({ page });
  };
  const brandHandler = (e) => {
    filterSearch({ brand: e.target.value });
  };
  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value });
  };
  const priceHandler = (e) => {
    filterSearch({ price: e.target.value });
  };
  const ratingHandler = (e) => {
    filterSearch({ ratings: e.target.value });
  };

  return (
    <>
      <Grid className={classes.mt1} container spacing={1}>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Box className={classes.fullWidth}>
                <Typography>Categories</Typography>
                <Select fullWidth value={category} onChange={categoryHandler}>
                  <MenuItem value='all'>All</MenuItem>
                  {categories &&
                    categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                </Select>
              </Box>
            </ListItem>
            <ListItem>
              <Box className={classes.fullWidth}>
                <Typography>Brands</Typography>
                <Select value={brand} onChange={brandHandler} fullWidth>
                  <MenuItem value='all'>All</MenuItem>
                  {brands &&
                    brands.map((brand) => (
                      <MenuItem key={brand} value={brand}>
                        {brand}
                      </MenuItem>
                    ))}
                </Select>
              </Box>
            </ListItem>
            <ListItem>
              <Box className={classes.fullWidth}>
                <Typography>Prices</Typography>
                <Select value={price} onChange={priceHandler} fullWidth>
                  <MenuItem value='all'>All</MenuItem>
                  {prices.map((price) => (
                    <MenuItem key={price.value} value={price.value}>
                      {price.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </ListItem>
            <ListItem>
              <Box className={classes.fullWidth}>
                <Typography>Ratings</Typography>
                <Select value={ratings} onChange={ratingHandler} fullWidth>
                  <MenuItem value='all'>All</MenuItem>
                  {ratingGroup.map((rating) => (
                    <MenuItem dispaly='flex' key={rating} value={rating}>
                      <Rating value={rating} readOnly />
                      <Typography component='span'>&amp; Up</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={9}>
          <Grid container justifyContent='space-between' alignItems='center'>
            <Grid item>
              {products.length === 0 ? 'No' : countProducts} Results
              {query !== 'all' && query !== '' && ' : ' + query}
              {category !== 'all' && ' : ' + category}
              {brand !== 'all' && ' : ' + brand}
              {price !== 'all' && ' : Price ' + price}
              {ratings !== 'all' && ' : Rating ' + ratings + ' & up'}
              {(query !== 'all' && query !== '') ||
              category !== 'all' ||
              brand !== 'all' ||
              ratings !== 'all' ||
              price !== 'all' ? (
                <Button onClick={() => router.push('/search')}>
                  <CancelIcon />
                </Button>
              ) : null}
            </Grid>
            <Grid item>
              <Typography component='span' className={classes.sort}>
                Sort by
              </Typography>
              <Select value={sort} onChange={sortHandler}>
                <MenuItem value='featured'>Featured</MenuItem>
                <MenuItem value='lowest'>Price: Low to High</MenuItem>
                <MenuItem value='highest'>Price: High to Low</MenuItem>
                <MenuItem value='toprated'>Customer Reviews</MenuItem>
                <MenuItem value='newest'>Newest Arrivals</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Grid className={classes.mt1} container spacing={3}>
            {products.map((product) => (
              <ProductItem product={product} key={product.name} />
            ))}
          </Grid>
          <Pagination
            className={classes.mt1}
            defaultPage={parseInt(query.page || '1')}
            count={pages}
            onChange={pageHandler}
          ></Pagination>
        </Grid>
      </Grid>
    </>
  );
};

export default Search;
