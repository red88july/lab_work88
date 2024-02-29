import { Alert, Avatar, Box, Button, CircularProgress, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { login } from './usersThunk.ts';
import {isLoginError, isLoginUser, selectUserDetails} from './usersSlice.ts';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';

import { Login } from '../../types';
import LockOpenIcon from '@mui/icons-material/LockOpen';


const LogForm = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userDetails = useAppSelector(selectUserDetails);

  const loadingLogin = useAppSelector(isLoginUser);
  const errorLogin = useAppSelector(isLoginError);

  const [loggining, setLoggining] = useState<Login>({
    username: '',
    password: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setLoggining((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const formSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await dispatch(login(loggining)).unwrap();

      setLoggining((prevState) => {
        return {
          ...prevState,
          username: '',
          password: '',
        };
      });

      setTimeout(()=> {
        navigate('/');
      }, 1600);

    } catch (e) {
      //error
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOpenIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {errorLogin &&
          (<Alert severity="warning">
            {errorLogin.message}
          </Alert>)}
        {userDetails &&
          (<Alert severity="success">
            {userDetails.message}
          </Alert>)}
        <Box component="form" onSubmit={formSubmitHandler} sx={{mt: 3}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Username"
                name="username"
                value={loggining.username}
                onChange={inputChangeHandler}
                autoComplete="current-username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                name="password"
                label="Password"
                type="password"
                value={loggining.password}
                onChange={inputChangeHandler}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            {loadingLogin ? <CircularProgress/> : 'Login'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                You haven't account? Register
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LogForm;