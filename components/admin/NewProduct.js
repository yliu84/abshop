import axios from 'axios';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import React, { useEffect, useContext, useReducer, useState } from 'react';
import {
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  ListItemText,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { getError } from '../../utils/error';
import { Store } from '../../utils/Store';
import useStyles from '../../utils/styles';

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreate: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false, errorCreate: action.payload };
    default:
      return state;
  }
}

const NewProduct = () => {
  const { state } = useContext(Store);
  const [{ loadingCreate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const classes = useStyles();
  const { userInfo } = state;

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    if (!userInfo) {
      return router.push('/login');
    }
  }, []);

  const uploadHandler = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((oldArray) => [...oldArray, reader.result]);
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const submitHandler = async ({
    name,
    slug,
    price,
    category,
    brand,
    countInStock,
    description,
  }) => {
    closeSnackbar();
    const productData = {
      name,
      slug,
      price,
      category,
      brand,
      countInStock: Number(countInStock),
      description,
      images,
    };

    if (images.length === 0)
      return enqueueSnackbar('Please upload images', { variant: 'error' });

    try {
      dispatch({ type: 'CREATE_REQUEST' });
      await axios.post(`/api/admin/products`, productData, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: 'CREATE_SUCCESS' });
      enqueueSnackbar('Product created successfully', { variant: 'success' });
      router.push('/admin/products');
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL', payload: getError(err) });
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item md={3} xs={12}>
        <Card className={classes.section}>
          <List>
            <NextLink href='/admin/dashboard' passHref>
              <ListItem button component='a'>
                <ListItemText primary='Admin Dashboard'></ListItemText>
              </ListItem>
            </NextLink>
            <NextLink href='/admin/orders' passHref>
              <ListItem button component='a'>
                <ListItemText primary='Orders'></ListItemText>
              </ListItem>
            </NextLink>
            <NextLink href='/admin/products' passHref>
              <ListItem selected button component='a'>
                <ListItemText primary='Products'></ListItemText>
              </ListItem>
            </NextLink>
            <NextLink href='/admin/users' passHref>
              <ListItem button component='a'>
                <ListItemText primary='Users'></ListItemText>
              </ListItem>
            </NextLink>
          </List>
        </Card>
      </Grid>
      <Grid item md={9} xs={12}>
        <Card className={classes.section}>
          <List>
            <ListItem>
              <Typography component='h1' variant='h1'>
                New Product
              </Typography>
            </ListItem>
            <ListItem>
              <form
                onSubmit={handleSubmit(submitHandler)}
                className={classes.form}
              >
                <List>
                  <ListItem>
                    <Controller
                      name='name'
                      control={control}
                      defaultValue=''
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <TextField
                          variant='outlined'
                          fullWidth
                          id='name'
                          label='Name'
                          error={Boolean(errors.name)}
                          helperText={errors.name ? 'Name is required' : ''}
                          {...field}
                        ></TextField>
                      )}
                    ></Controller>
                  </ListItem>
                  <ListItem>
                    <Controller
                      name='slug'
                      control={control}
                      defaultValue=''
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <TextField
                          variant='outlined'
                          fullWidth
                          id='slug'
                          label='Slug'
                          error={Boolean(errors.slug)}
                          helperText={errors.slug ? 'Slug is required' : ''}
                          {...field}
                        ></TextField>
                      )}
                    ></Controller>
                  </ListItem>
                  <ListItem>
                    <Controller
                      name='price'
                      control={control}
                      defaultValue=''
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <TextField
                          variant='outlined'
                          fullWidth
                          id='price'
                          label='Price'
                          error={Boolean(errors.price)}
                          helperText={errors.price ? 'Price is required' : ''}
                          {...field}
                        ></TextField>
                      )}
                    ></Controller>
                  </ListItem>
                  <ListItem>
                    <Controller
                      name='category'
                      control={control}
                      defaultValue=''
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <TextField
                          variant='outlined'
                          fullWidth
                          id='category'
                          label='Category'
                          error={Boolean(errors.category)}
                          helperText={
                            errors.category ? 'Category is required' : ''
                          }
                          {...field}
                        ></TextField>
                      )}
                    ></Controller>
                  </ListItem>
                  <ListItem>
                    <Controller
                      name='brand'
                      control={control}
                      defaultValue=''
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <TextField
                          variant='outlined'
                          fullWidth
                          id='brand'
                          label='Brand'
                          error={Boolean(errors.brand)}
                          helperText={errors.brand ? 'Brand is required' : ''}
                          {...field}
                        ></TextField>
                      )}
                    ></Controller>
                  </ListItem>
                  <ListItem>
                    <Controller
                      name='countInStock'
                      control={control}
                      defaultValue=''
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <TextField
                          variant='outlined'
                          fullWidth
                          id='countInStock'
                          label='Count in stock'
                          error={Boolean(errors.countInStock)}
                          helperText={
                            errors.countInStock
                              ? 'Count in stock is required'
                              : ''
                          }
                          {...field}
                        ></TextField>
                      )}
                    ></Controller>
                  </ListItem>
                  <ListItem>
                    <Controller
                      name='description'
                      control={control}
                      defaultValue=''
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <TextField
                          variant='outlined'
                          fullWidth
                          multiline
                          id='description'
                          label='Description'
                          error={Boolean(errors.description)}
                          helperText={
                            errors.description ? 'Description is required' : ''
                          }
                          {...field}
                        ></TextField>
                      )}
                    ></Controller>
                  </ListItem>
                  <ListItem>
                    <Button variant='contained' component='label'>
                      Upload Images
                      <input
                        type='file'
                        onChange={uploadHandler}
                        multiple
                        hidden
                      />
                    </Button>
                  </ListItem>
                  <ListItem>
                    {imagesPreview.map((img) => (
                      <Image
                        src={img}
                        key={img}
                        alt='Images Preview'
                        className={classes.imageList}
                        width='55'
                        height='55'
                      />
                    ))}
                  </ListItem>

                  <ListItem>
                    <Button
                      variant='contained'
                      type='submit'
                      fullWidth
                      color='primary'
                      disabled={loadingCreate}
                    >
                      Create
                    </Button>
                    {loadingCreate && <CircularProgress />}
                  </ListItem>
                </List>
              </form>
            </ListItem>
          </List>
        </Card>
      </Grid>
    </Grid>
  );
};

export default NewProduct;
