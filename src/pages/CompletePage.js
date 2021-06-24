import React from 'react';

import Grid from '@material-ui/core/Grid';

import Header from '../components/Header';
import Title from '../components/Title';
import Complete from '../components/Complete';

export default function CompletePage() {
  return (
    <Grid container>
      <Header />
      <Title />
      <Complete />
    </Grid>
  );
}
