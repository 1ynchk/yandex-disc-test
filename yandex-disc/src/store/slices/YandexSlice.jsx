import { createSlice } from '@reduxjs/toolkit';

import { fetchGetFiles } from '../requests/get-files';

const YandexSlice = createSlice(
    {
        name: 'yandex',

        initialState: {
            file: {},
            dir: [], 
            loading: false,
            error: '',
            _type: ''
        },

        reducers: {

        },

        extraReducers: (builder) => {
            builder
                .addCase(
                    fetchGetFiles.fulfilled, (state, action) => {
                        if (action.payload.type == 'dir') {
                            state.dir = action.payload._embedded.items
                        } else {
                            state.file = action.payload
                        }
                        state.loading = false
                        state.error = ''
                    }
                )
                .addCase(
                    fetchGetFiles.pending, (state, action) => {
                        state.loading = true
                    }
                )
                .addCase(
                    fetchGetFiles.rejected, (state, action) => {
                        state.error = action.payload.comment
                        state.loading = false
                    }
                )
        }
    }
)

export default YandexSlice.reducer