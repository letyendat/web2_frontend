/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/require-default-props */
/* eslint-disable no-use-before-define */
import { yupResolver } from '@hookform/resolvers/yup';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as yup from 'yup';
import InputField from '../../../../components/form-controls/InputField';
import PasswordField from '../../../../components/form-controls/PasswordField';
import { setMode } from '../../../../components/Header/headerSlice';

const theme = createTheme();

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

const useStyles = makeStyles(() => ({
  root: {

  },
  link: {
    "margin-top": "15px", 
    "text-decoration": "none"
  }
}));

function LoginForm(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    email: yup.string().required('Please enter email.').email('Please enter a valid email address.'),
    password: yup.string().required('Please enter password').min(6, 'Password is too short'),
  });
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const handleRegisterClick = () => {
    const action = setMode();
    dispatch(action);
  };

  const { isSubmitting } = form.formState

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined></LockOutlined>
          </Avatar>

          <Typography component="h3" variant="h5">
            Sign In
          </Typography>

          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <InputField name="email" label="Email" form={form} />
            <PasswordField name="password" label="Password" form={form} />

            {
              isSubmitting &&
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
            }

            <Button sx={{
              marginTop: 2,
              backgroundColor: '#26a69a'
            }}
              disabled={isSubmitting} type="submit" variant="contained" color="primary" fullWidth>
              Sign In
            </Button>
          </form>

          <NavLink className={classes.link} to="/register">
            <Button sx={{color: '#26a69a'}} onClick={handleRegisterClick}>Register a account</Button>
          </NavLink>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default LoginForm;
