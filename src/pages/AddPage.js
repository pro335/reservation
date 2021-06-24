import React from 'react';

import Grid from '@material-ui/core/Grid';

import Header from '../components/Header';
import AddComponent from '../components/AddComponent';

export default function NewPage() {
  return (
    <Grid container>
      <Header />
      <AddComponent />
    </Grid>
  );
}
