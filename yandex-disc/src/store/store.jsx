import { configureStore, combineReducers } from '@reduxjs/toolkit'

import UsersReducer from './slices/UsersSlice'
import YandexReducer from './slices/YandexSlice'

const reducers = combineReducers(
    {
        users: UsersReducer,
        yandex: YandexReducer
    }
)

const store = configureStore(
    {
        reducer: reducers
    }
)

export default store