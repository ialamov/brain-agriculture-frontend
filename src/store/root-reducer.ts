import { combineReducers } from 'redux'
import { authReducer } from './auth/reducer'
import { homeReducer } from './home/reducer'
import { farmersReducer } from './farmer/reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  farmers: farmersReducer
})

export default rootReducer