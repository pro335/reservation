import React from 'react';
import { ADD_RESERVATION, RESERVATION_UPDATED } from '../../redux/constants/ActionTypes';

import { 
  Typography,
  Grid,
  Paper,
  TextField,
  Radio,
  Button,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@material-ui/core';

import { useSelector, useDispatch } from "react-redux";
import moment from 'moment'; 
import { useHistory } from 'react-router-dom'

import useStyles from './useStyles';
import { v1 as uuidv1 } from 'uuid';

export default function AddPage() {
  const classes = useStyles();

  const reservation = useSelector(state => state.reservations.reservation);
  const actionFlag = useSelector(state => state.reservations.actionFlag);
  const dispatch = useDispatch();

  const [customerName, setCustomerName] = React.useState( actionFlag === 0 ? '' : reservation.customerName);
  const [reservationDateTime, setReservationDateTime] = React.useState( actionFlag === 0 ? moment().add(3, 'days').format("YYYY-MM-DDThh:mm") : reservation.reservationDateTime);
  const [reservationState, setReservationState] = React.useState( actionFlag === 0 ? 'upcoming' : reservation.reservationState);

  const history = useHistory()


  const handleCustomerNameChange = (event) => {
    setCustomerName(event.target.value);
  }

  const handleReservationDateTimeChange = (event) => {
    setReservationDateTime(event.target.value);
  }
  
  const handleStateChange = (event) => {
    setReservationState(event.target.value);
  };

  const addReservation = () => {
    if(customerName === "") {
      alert("Please type customer name!")
      return;
    }
    let newReservation = {
      id: actionFlag === 0 ? uuidv1(): reservation.id,
      customerName: customerName,
      reservationDateTime: reservationDateTime,
      reservationState: reservationDateTime < moment().format("YYYY-MM-DDThh:mm") && reservationState === 'upcoming' ? 'finished': reservationState
    }

    dispatch({
      type: actionFlag === 0 ? ADD_RESERVATION: RESERVATION_UPDATED,
      payload: newReservation
    })

    history.push("/")
  };  

  return (
    <Grid container justify="center">
      <Paper className={classes.paperClass}>
        <Typography variant="h4"> {actionFlag === 0 ? "Add Reservation": "Update Reservation" }</Typography>
        <Grid container direction="column">
          <TextField id="standard-basic" label="Customer Name" className={classes.customerName} value={customerName} onChange={handleCustomerNameChange} />
          <TextField
            id="datetime-local"
            label="Date & Time of the reservation"
            type="datetime-local"
            className={classes.dateTimeReservation}
            InputLabelProps={{
              shrink: true,
            }}
            value={reservationDateTime}
            onChange={handleReservationDateTimeChange}
          />
          <FormControl component="fieldset" className={classes.stateClass}>
            <FormLabel component="legend">State</FormLabel>
            <RadioGroup aria-label="gender" name="state" value={reservationState} onChange={handleStateChange}>
              <FormControlLabel value="upcoming" control={<Radio />} label="Upcoming" />
              <FormControlLabel value="finished" control={<Radio />} label="Finished" />
              <FormControlLabel value="cancelled" control={<Radio />} label="Cancelled" />
            </RadioGroup>
          </FormControl>
          <Button variant="contained" color="secondary" className={classes.addBtnClass} onClick={addReservation}>
            {actionFlag === 0 ? "Add Reservation": "Update Reservation" }
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
}
