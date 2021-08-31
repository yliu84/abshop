import React, { useContext, useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';
import useStyles from '../../utils/styles';
import { useRouter } from 'next/router';
import { Store } from '../../utils/Store';
import CheckoutWizard from './CheckoutWizard';

const Payment = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('');
  const { state, dispatch } = useContext(Store);
  const {
    cart: { shippingAddress },
  } = state;
  useEffect(() => {
    if (!shippingAddress.address) {
      router.push('/shipping');
    } else {
      setPaymentMethod(Cookies.get('paymentMethod') || '');
    }
  }, []);
  const submitHandler = (e) => {
    closeSnackbar();
    e.preventDefault();
    if (!paymentMethod) {
      enqueueSnackbar('Payment method is required', { variant: 'error' });
    } else {
      dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod });
      Cookies.set('paymentMethod', paymentMethod);
      router.push('/placeorder');
    }
  };

  return (
    <>
      <CheckoutWizard activeStep={2}></CheckoutWizard>
      <form className={classes.form} onSubmit={submitHandler}>
        <Typography component='h1' variant='h1'>
          Payment Method
        </Typography>
        <List>
          <ListItem>
            <FormControl component='fieldset'>
              <RadioGroup
                aria-label='Payment Method'
                name='paymentMethod'
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  label='PayPal'
                  value='PayPal'
                  control={<Radio />}
                ></FormControlLabel>
                <FormControlLabel
                  label='Stripe'
                  value='Stripe'
                  control={<Radio />}
                ></FormControlLabel>
                <FormControlLabel
                  label='Cash'
                  value='Cash'
                  control={<Radio />}
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <Button fullWidth type='submit' variant='contained' color='primary'>
              Continue
            </Button>
          </ListItem>
          <ListItem>
            <Button
              fullWidth
              type='button'
              variant='contained'
              onClick={() => router.push('/shipping')}
            >
              Back
            </Button>
          </ListItem>
        </List>
      </form>
    </>
  );
};

export default Payment;
