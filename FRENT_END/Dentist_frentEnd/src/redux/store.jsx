

import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'


const rootReducer = combineReducers({
    timeSlots: timeSlotReducer,
    appointments: appointmentReducer,
})

const store = createStore(rootReducer , applyMiddleware(thunk))


export default store ;

