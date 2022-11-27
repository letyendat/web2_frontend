/* eslint-disable no-underscore-dangle */
/* eslint-disable no-bitwise */
import { AccountCircle } from '@mui/icons-material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../features/Auth/userSlice';
import { setMode } from './headerSlice';
import CreateGroup from '../../features/Group/components/CreateGroup';

const useStyles = makeStyles(() => ({
  root: {

  },
  link: {
    "text-decoration": "none",
    "color": "white",
    "backgroundColor": "black"
  }
}));

export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loggedInUser = useSelector(state => state.user.current)
  const isLoginIn = !!loggedInUser._id;

  const mode = useSelector(state => state.header)

  const [anchorElAccount, setAnchorElAccount] = useState(null);
  const [anchorElFeature, setAnchorElFeature] = useState(null);
  const [openDialogCreateGroup, setOpenDialogCreateGroup] = useState(false);

  const handleAccountClick = (e) => {
    setAnchorElAccount(e.currentTarget);
  };
  const handleCloseAccountMenu = () => {
    setAnchorElAccount(null);
  };
  const handleLoggoutClick = () => {
    const action = logout();
    dispatch(action);
    handleCloseAccountMenu();
  };

  const handleFeatureClick = (e) => {
    setAnchorElFeature(e.currentTarget);
  };
  const handleCloseFeatureMenu = () => {
    setAnchorElFeature(null);
  };

  const handleRegisterClick = () => {
    const action = setMode();
    dispatch(action);
  };
  const handleLoginClick = () => {
    const action = setMode();
    dispatch(action);
  };

  const handleClickOpenDialogCreateGroup = () => {
    setOpenDialogCreateGroup(true);
    handleCloseFeatureMenu()
  };

  const handleCloseDialogCreateGroup = () => {
    setOpenDialogCreateGroup(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Class Room
          </Typography>

          {!isLoginIn && (
            (!mode && (
              <Link className={classes.link} to="/login">
                <Button color="inherit" onClick={handleLoginClick}>
                  Login
                </Button>
              </Link>
            )) || (mode && (
              <Link className={classes.link} to="/register">
                <Button color="inherit" onClick={handleRegisterClick}>
                  Register
                </Button>
              </Link>
            )
            ))}

          {isLoginIn && (
            <div>
              <IconButton color="inherit" onClick={handleFeatureClick}>
                <AddCircleIcon fontSize='large' />
              </IconButton>
              <IconButton color="inherit" onClick={handleAccountClick}>
                <AccountCircle fontSize='large' />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>

      <Menu
        id="account-menu"
        anchorEl={anchorElAccount}
        open={Boolean(anchorElAccount)}
        onClose={handleCloseAccountMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleCloseAccountMenu}>Profile</MenuItem>
        <MenuItem onClick={handleCloseAccountMenu}>My account</MenuItem>
        <MenuItem onClick={handleLoggoutClick}>Logout</MenuItem>
      </Menu>

      <Menu
        id="feature-menu"
        anchorEl={anchorElFeature}
        open={Boolean(anchorElFeature)}
        onClose={handleCloseFeatureMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClickOpenDialogCreateGroup}>Create a group</MenuItem>
        <MenuItem onClick={handleCloseFeatureMenu}>Join to a group</MenuItem>
      </Menu>

      <Dialog
        open={openDialogCreateGroup}
        onClose={handleCloseDialogCreateGroup}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <CreateGroup onClose={handleCloseDialogCreateGroup}/>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleCloseDialogCreateGroup}>Create</Button>
          <Button onClick={handleCloseDialogCreateGroup} autoFocus>
            Cancel
          </Button>
        </DialogActions> */}
      </Dialog>
    </Box>
  );
}
