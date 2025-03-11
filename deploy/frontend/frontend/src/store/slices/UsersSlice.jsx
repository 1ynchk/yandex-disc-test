import { createSlice } from "@reduxjs/toolkit";
import { fetchCheckLogin } from "../requests/check-login";
import { fetchRegister } from './../requests/register';
import { fetchLogin } from "../requests/login";
import { fetchLogout } from "../requests/logout";

const UsersSlice = createSlice(
    {
        name: 'users',

        initialState: {
            isLogin: false,
            loading: false,
            loading_container: false,
            isAuth: null,
            isLoginError: false,
            isLoaded: false,
            firstName: ''
        },

        reducers: {
            setAuth(state, action) {
                state.isAuth = null
            }, 
            setLoginError(state, action) {
                state.isLoginError = false
            }
        },

        extraReducers: (builder) => {
            builder
                .addCase(
                    fetchLogin.fulfilled, (state, action) => {
                        state.loading_container = false
                        window.location.reload()
                    }
                )
                .addCase(
                    fetchLogin.pending, (state, action) => {
                        state.loading_container = true
                    }
                )
                .addCase(
                    fetchLogin.rejected, (state, action) => {
                        state.loading_container = false
                        state.isLoginError = true
                    }
                )
                .addCase(
                    fetchCheckLogin.fulfilled, (state, action) => {
                        state.firstName = action.payload.name
                        state.isLoaded = true
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
                .addCase(
                    fetchLogout.fulfilled, (state, action) => {
                        state.isLogin = false
                        window.location.reload()
                    }
                )
        }
    }
)

export const { setAuth, setLoginError } = UsersSlice.actions

export default UsersSlice.reducer