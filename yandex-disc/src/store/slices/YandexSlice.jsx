import { createSlice } from '@reduxjs/toolkit';

import { fetchGetFiles } from '../requests/get-files';
import { fetchGetDownloadLink } from './../requests/download-file';

const YandexSlice = createSlice(
    {
        name: 'yandex',

        initialState: {
            file: {},
            dir: [],
            loading: false,
            error: false,
            _type: '',
            loadingFile: false,
            isPopupActive: false,
            file_link: '',
            file_name: ''
        },

        reducers: {
            setPopupActive(state, action) {
                state.isPopupActive = action.payload
            },
            setClearState(state, action) {
                state.file = {}
                state.dir = []
                state._type = ''
            }
        },

        extraReducers: (builder) => {
            builder
                .addCase(
                    fetchGetFiles.fulfilled, (state, action) => {
                        if (action.payload.type == 'dir') {
                            state._type = 'dir'
                            state.dir = action.payload._embedded.items
                        } else {
                            state._type = 'file'
                            state.file = action.payload
                        }
                        state.loading = false
                        state.error = false
                    }
                )
                .addCase(
                    fetchGetFiles.pending, (state, action) => {
                        state.loading = true
                    }
                )
                .addCase(
                    fetchGetFiles.rejected, (state, action) => {
                        state.error = true
                        state.loading = false
                    }
                )
                .addCase(
                    fetchGetDownloadLink.fulfilled, (state, action) => {
                        state.file_link = action.payload.download_url
                        state.file_name = action.payload.name
                        state.loadingFile = false
                    }
                )
                .addCase(
                    fetchGetDownloadLink.pending, (state, action) => {
                        state.loadingFile = true
                        state.isPopupActive = true
                    }
                )
                .addCase(
                    fetchGetDownloadLink.rejected, (state, action) => {
                        state.loadingFile = false
                    }
                )
        }
    }
)

export const { setPopupActive, setClearState } = YandexSlice.actions

export default YandexSlice.reducer