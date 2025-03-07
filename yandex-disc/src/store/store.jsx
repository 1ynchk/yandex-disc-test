import { configureStore, combineReducers } from '@reduxjs/toolkit'

import UsersReducer from './slices/UsersSlice'

const reducers = combineReducers(
    {
        users: UsersReducer
    }
)

const store = configureStore(
    {
        reducer: reducers
    }
)

export default store