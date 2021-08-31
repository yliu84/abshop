import React, { useContext, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  AppBar,
  Container,
  createTheme,
  Link,
  ThemeProvider,
  Toolbar,
  Typography,
  CssBaseline,
  Switch,
  Badge,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
import useStyles from '../utils/styles';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const Layout = ({ children, title = 'Buy Best Product Online' }) => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;

  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      body1: {
        fontWeight: 'normal',
      },
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  });
  const classes = useStyles();

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newDarkMode = !darkMode;
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const loginMenuCloseHandler = (redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };

  const logoutHandler = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' });
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    Cookies.remove('shippinhAddress');
    Cookies.remove('paymentMethod');
    router.push('/');
  };

  return (
    <div>
      <Head>
        <title>{title} - ABShop</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position='sticky' className={classes.navbar}>
          <Toolbar>
            <NextLink href='/' passHref>
              <Link>
                <Typography className={classes.brand}>ABShop</Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <div>
              <Switch
                checked={darkMode}
                onClick={darkModeChangeHandler}
              ></Switch>
              <NextLink href='/cart' passHref>
                <Link>
                  {cart.cartItems.length > 0 ? (
                    <Badge
                      color='secondary'
                      badgeContent={cart.cartItems.length}
                    >
                      Cart
                    </Badge>
                  ) : (
                    'Cart'
                  )}
                </Link>
              </NextLink>
              {userInfo ? (
                <>
                  <Button
                    aria-controls='simple-menu'
                    aria-haspopup='true'
                    onClick={loginClickHandler}
                    className={classes.navbarButton}
                  >
                    {userInfo.name}
                  </Button>
                  <Menu
                    id='simple-menu'
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}
                  >
                    <MenuItem
                      onClick={() => loginMenuCloseHandler('/user/profile')}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      button
                      divider
                      onClick={() => loginMenuCloseHandler('/order/history')}
                    >
                      Order Hisotry
                    </MenuItem>
                    {userInfo.isAdmin && (
                      <MenuItem
                        button
                        divider
                        onClick={() =>
                          loginMenuCloseHandler('/admin/dashboard')
                        }
                      >
                        Admin Dashboard
                      </MenuItem>
                    )}
                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href='/auth/login' passHref>
                  <Link>Login</Link>
                </NextLink>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>All rights reserved. AB-Shop.</Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
};

export default Layout;
