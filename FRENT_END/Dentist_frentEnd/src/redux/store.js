

import {applyMiddleware, combineReducers, createStore} from 'redux'
import { thunk } from 'redux-thunk';
import { timeSlotReducer } from './reducers/timeSlotReducer'
import {appointmentReducer} from './reducers/appointmentReducer'
import { authReducer } from './reducers/authReducer';



const rootReducer = combineReducers({
    timeSlots: timeSlotReducer,
    appointments: appointmentReducer,
    auth: authReducer
})

const store = createStore(rootReducer , applyMiddleware(thunk))


export default store ;

