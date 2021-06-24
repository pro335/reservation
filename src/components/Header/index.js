import React from 'react';
import { SET_ACTION_FLAG, SET_STATE_FLAG } from '../../redux/constants/ActionTypes';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';

import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";

import useStyles from './useStyles';

export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory()
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const goAddReservation = () => {
    dispatch({
      type: SET_ACTION_FLAG,
      payload: 0
    })

    history.push("/new")
  }

  const goHomePage = () => {
    dispatch({
      type: SET_STATE_FLAG,
      payload: 0
    })
  }

  const goUpcoming = () => {
    dispatch({
      type: SET_STATE_FLAG,
      payload: 1
    })
    handleMobileMenuClose();
    history.push("/")
  }

  const goFinishedCancelled = () => {
    dispatch({
      type: SET_STATE_FLAG,
      payload: 2
    })
    handleMobileMenuClose();
    history.push("/")
  }

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={goUpcoming}>
        <Button color="inherit">Upcoming</Button>
      </MenuItem>
      <MenuItem onClick={goFinishedCancelled}>
        <Button color="inherit">Finished/Cancelled</Button>
      </MenuItem>
      <MenuItem onClick={goAddReservation}>
        <Button color="inherit">Add Reservation</Button>
      </MenuItem>
    </Menu>
  );

  return (
    <Grid container className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap>
            <Link to="/" className={classes.logoTitle} onClick={goHomePage}>
              Reservation
            </Link>
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button color="inherit" onClick={goUpcoming}>Upcoming</Button>
            <Button color="inherit" onClick={goFinishedCancelled}>Finished/Cancelled</Button>
            <Button color="inherit" onClick={goAddReservation}>Add Reservation</Button>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Grid>
  );
}
