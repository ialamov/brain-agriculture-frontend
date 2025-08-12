import { combineReducers } from 'redux'
import { authReducer } from './auth/reducer'
import { homeReducer } from './home/reducer'
import { farmersReducer } from './farmer/reducer'
import { farmsReducer } from './farm/reducer'
import { harvestsReducer } from './harvest/reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  farmers: farmersReducer,
  farms: farmsReducer,
  harvests: harvestsReducer,
})

export default rootReducer