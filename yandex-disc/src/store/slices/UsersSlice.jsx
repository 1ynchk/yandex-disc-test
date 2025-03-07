import { createSlice } from "@reduxjs/toolkit";
import { fetchCheckLogin } from "../requests/check-login";
import { fetchRegister } from './../requests/register';


const UsersSlice = createSlice(
    {
        name: 'users',

        initialState: {
            isLogin: false,
            loading: false,
            loading_container: false,
            isAuth: null
        },

        reducers: {
            setAuth(state, action) {
                state.isAuth = null
            }
        },

        extraReducers: (builder) => {
            builder
                .addCase(
                    fetchCheckLogin.fulfilled, (state, action) => {
                        state.isLogin = action.payload.auth
                        state.loading = false
                    }
                )
                .addCase(
                    fetchCheckLogin.pending, (state, action) => {
                        state.loading = true
                    }
                )
                .addCase(
                    fetchCheckLogin.rejected, (state, action) => {
                        state.loading = false
                    }
                )
                .addCase(
                    fetchRegister.fulfilled, (state, action) => {
                        console.log(action.payload)
                        state.loading_container = false
                        state.isAuth = true
                    }
                )
                .addCase(
                    fetchRegister.pending, (state, action) => {
                        state.loading_container = true
                    }
                )
                .addCase(
                    fetchRegister.rejected, (state, action) => {
                        state.loading_container = false
                        state.isAuth = false
                    }
                )
        }
    }
)

export const { setAuth } = UsersSlice.actions 

export default UsersSlice.reducer