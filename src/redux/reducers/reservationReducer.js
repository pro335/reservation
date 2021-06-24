import {GET_RESERVATIONS, SET_ACTION_FLAG, SET_STATE_FLAG, ADD_RESERVATION, DELETE_RESERVATION, UPDATE_RESERVATION, RESERVATION_UPDATED} from '../constants/ActionTypes'
const initialState = {
    reservations : [],
    reservation : {},
    actionFlag: 0,  // 0: Add, 1: Update
    stateFlag: 0,  // 0: Whole, 1: upcoming, 2: finished/cancelled
}
const reservationReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_RESERVATION:
            return {
                ...state,
                reservations : [...state.reservations, action.payload],
                actionFlag: 0,
            }

        case GET_RESERVATIONS:
            return {
                ...state,
                reservations : action.payload,
                reservation : {
                    isSingleQuoteView : false
                }
            }

        case DELETE_RESERVATION:
            let reservations = state.reservations.filter(reservation =>
                reservation._id !== action.payload._id
            )

            return {
                ...state,
                reservations : reservations
            }

        case UPDATE_RESERVATION:
            return {
                ...state,
                reservation : action.payload,
                actionFlag: 1,
            };

        case RESERVATION_UPDATED:
            let tempReservations = [];
            for(let i = 0 ; i < state.reservations.length ; i ++) {
                if(state.reservations[i].id === action.payload.id)
                    tempReservations.push(action.payload);
                else
                    tempReservations.push(state.reservations[i]);

            }

            return {
                ...state,
                reservations: tempReservations,
            };

        case SET_ACTION_FLAG:
            return {
                ...state,
                actionFlag: action.payload,
            };

        case SET_STATE_FLAG:
            return {
                ...state,
                stateFlag: action.payload,
            };
    
        default:
            return state
    }
}

export default reservationReducer;