import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { host } from "../host";

export const fetchGetDownloadLink = createAsyncThunk('yandex/fetchGetDownloadLink', 
    async (params) => {

        const response = await axios.get(
            `${host}/api_yandex/get_file_link/`,
            {
                params: {
                    public_key: params.public_key,
                    path: params.path,
                },
                withCredentials: true
            }
        )

        return response.data
    }
)