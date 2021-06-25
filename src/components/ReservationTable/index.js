import React from 'react';
import { UPDATE_RESERVATION, SET_FILTER_DATE } from '../../redux/constants/ActionTypes';
import moment from 'moment'; 
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

import EditIcon from '@material-ui/icons/Edit';

import { useSelector } from "react-redux";

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import useStyles from './useStyles';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'customerName', numeric: false, disablePadding: true, label: 'Customer Name' },
  { id: 'reservationDateTime', numeric: false, disablePadding: false, label: 'Date & Time of the Reservation' },
  { id: 'reservationState', numeric: false, disablePadding: false, label: 'Reservation State' },
  { id: 'action', numeric: false, disablePadding: false, label: 'Action' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={'center'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#A0E7E5',
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export default function ReservationTable() {
  const dispatch = useDispatch();
  const history = useHistory()
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const stateFlag = useSelector(state => state.reservations.stateFlag);
  const rows = useSelector(state => {
    let wholeReservations = state.reservations.reservations;
    let tempReservations = [];
    for( let i = 0 ; i < wholeReservations.length; i ++) {
      switch(stateFlag) {
        case 0:
          if(state.reservations.filterDate === null)
            tempReservations.push(wholeReservations[i]);
          else if(moment(state.reservations.filterDate).format('yyyy-MM-DD') === moment(wholeReservations[i].reservationDateTime).format('yyyy-MM-DD'))
              tempReservations.push(wholeReservations[i]);
          break;
        case 1:
          if(wholeReservations[i].reservationState === "upcoming") {
            if(state.reservations.filterDate === null)
              tempReservations.push(wholeReservations[i]);
            else if(moment(state.reservations.filterDate).format('yyyy-MM-DD') === moment(wholeReservations[i].reservationDateTime).format('yyyy-MM-DD'))
                tempReservations.push(wholeReservations[i]);
          }
          break;
        case 2:
          if(wholeReservations[i].reservationState === "finished" || wholeReservations[i].reservationState === "cancelled") {
            if(state.reservations.filterDate === null)
              tempReservations.push(wholeReservations[i]);
            else if(moment(state.reservations.filterDate).format('yyyy-MM-DD') === moment(wholeReservations[i].reservationDateTime).format('yyyy-MM-DD'))
                tempReservations.push(wholeReservations[i]);
          }
          break;
      }
    }
    return tempReservations
  });
  const selectedDate = useSelector(state => state.reservations.filterDate);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, data) => {
    if(data === null) {
      alert("Data selection error!");
      return;
    }

    dispatch({
      type: UPDATE_RESERVATION,
      payload: data
    })

    history.push("/new")
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDateChange = (date) => {
    dispatch({
      type: SET_FILTER_DATE,
      payload: date
    })
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const determineLabel = (stateFlag) => {
    switch(stateFlag) {
      case 0:
        return 'All Reservations';
      case 1:
        return 'Upcoming';
      case 2:
        return 'Finished/Cancelled';
      default:
        return 'All Reservations';
    }
  }

  const determineStateColor = (state) => {
    switch(state) {
      case 'upcoming':
        return 'red';
      case 'finished':
        return 'blue';
      case 'cancelled':
        return 'green';
      default:
        return 'red';
    }
  }


  return (
    <Container className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h4"> {determineLabel(stateFlag)}</Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            // variant="inline"
            clearable
            format="yyyy-MM-dd"
            margin="normal"
            id="date-picker-inline"
            label="Please pick a date"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                    >
                      <TableCell component="th" align="center" id={labelId} scope="row" padding="none">
                        {row.customerName}
                      </TableCell>
                      <TableCell align="center">{row.reservationDateTime}</TableCell>
                      <TableCell align="center" style={{color: determineStateColor(row.reservationState)}}>{row.reservationState}</TableCell>
                      <TableCell align="center">
                        <IconButton onClick={(event) => handleClick(event, row)}>
                          <EditIcon color="primary" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
}
