import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from "react-redux";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';

import LandingPage from './pages/LandingPage';
import AddPage from './pages/AddPage';

import store from './redux/store/configureStore';

import './App.css';

function App(props) {
  const { width } = props;

  return (

    <Grid container>
      <Provider store={store}>
      {/* <Typography gutterBottom>
        Current width: {width}
      </Typography> */}
        <Router>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/new" component={AddPage} />
        </Router>
      </Provider>
    </Grid>
  );
}

App.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(App);
