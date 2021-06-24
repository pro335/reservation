import { combineReducers } from 'redux'
import reservations from "./reservationReducer";
const rootReducer = combineReducers({
  reservations
})

export default rootReducer
