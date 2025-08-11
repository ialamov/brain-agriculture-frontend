import { combineReducers } from 'redux'
import { authReducer } from './auth/reducer'
import { farmersReducer } from './Farmer/reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  farmers: farmersReducer
})

export default rootReducer