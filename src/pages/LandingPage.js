import React from 'react';

import Grid from '@material-ui/core/Grid';

import Header from '../components/Header';
import ReservationTable from '../components/ReservationTable';

export default function NewPage() {
  return (
    <Grid container>
      <Header />
      <ReservationTable />
    </Grid>
  );
}
