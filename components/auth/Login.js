import React, { useContext, useEffect } from 'react';
import {
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from '@material-ui/core';
import NextLink from 'next/link';
import useStyles from '../../utils/styles';
import axios from 'axios';
import { Store } from '../../utils/Store';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { getError } from '../../utils/error';

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const router = useRouter();
  const { redirect } = router.query; //login?redirect=/shipping

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []);

  const submitHandler = async ({ email, password }) => {
    closeSnackbar();
    try {
      const { data } = await axios.post('/api/auth/login', {
        email,
        password,
      });

      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', JSON.stringify(data));
      router.push(redirect || '/');
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };
  return (
    <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
      <Typography component='h1' variant='h1'>
        Login
      </Typography>
      <List>
        <ListItem>
          <Controller
            name='email'
            control={control}
            defaultValue=''
            rules={{
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            }}
            render={({ field }) => (
              <TextField
                variant='outlined'
                fullWidth
                id='email'
                label='Email'
                inputProps={{ type: 'email' }}
                error={Boolean(errors.email)}
                helperText={
                  errors.email
                    ? errors.email.type === 'pattern'
                      ? 'Email is not valid'
                      : 'Email is required'
                    : ''
                }
                {...field}
              ></TextField>
            )}
          ></Controller>
        </ListItem>
        <ListItem>
          <Controller
            name='password'
            control={control}
            defaultValue=''
            rules={{
              required: true,
              minLength: 6,
            }}
            render={({ field }) => (
              <TextField
                variant='outlined'
                fullWidth
                id='password'
                label='Password'
                inputProps={{ type: 'password' }}
                error={Boolean(errors.password)}
                helperText={
                  errors.password
                    ? errors.password.type === 'minLength'
                      ? 'Password length must be at least 6 characters long'
                      : 'Password is required'
                    : ''
                }
                {...field}
              ></TextField>
            )}
          ></Controller>
        </ListItem>
        <ListItem>
          <Button variant='contained' type='submit' fullWidth color='primary'>
            Login
          </Button>
        </ListItem>
        <ListItem>
          Don&apos;t have an account? &nbsp;
          <NextLink
            href={`/auth/register?redirect=${redirect || '/'}`}
            passHref
          >
            <Link>Register</Link>
          </NextLink>
        </ListItem>
      </List>
    </form>
  );
};

export default Login;
