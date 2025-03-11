import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

import { host } from './../host';

export const fetchGetFiles = createAsyncThunk('yandex/fetchGetFiles', 
    async(public_key) => {
        const response = await axios.get(
            `${host}/api_yandex/get_files/`, 
            {
                params: {
                    public_key: public_key
                },
                withCredentials: true
            }
        )

        return response.data
    }
)