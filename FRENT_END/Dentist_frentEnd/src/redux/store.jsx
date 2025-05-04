

import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import { timeSlotReducer } from './reducers/timeSlotReducer'
import {appointmentReducer} from './reducers/appointmentReducer'

const rootReducer = combineReducers({
    timeSlots: timeSlotReducer,
    appointments: appointmentReducer,
})

const store = createStore(rootReducer , applyMiddleware(thunk))


export default store ;

