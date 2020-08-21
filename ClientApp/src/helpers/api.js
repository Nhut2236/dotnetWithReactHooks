import axios from "axios";
const requestConfig = {
    baseURL: `https://localhost:5001`,
    timeout: 30000,
};
const DEFAULT_HEADER = {
    common: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    },
};
const MULTIPART_HEADER = {
    "Content-Type":
        "multipart/form-data;",
};

const instance = axios.create(requestConfig);

async function getAddonHeaders({ isPrivate, isMultipart }) {
    let headers = {};
    let token = "";
    if (isPrivate) {
        headers.Authorization = `Bearer ${token}`;
    }
    if (isMultipart) {
        headers = {
            ...headers,
            ...MULTIPART_HEADER,
        };
    }
    return headers;
}

export default async function sendRequest({
    url,
    method,
    data,
    params,
    isPrivate = false,
    isMultipart = false
}) {
    try {
        const addonHeaders = await getAddonHeaders({ isPrivate, isMultipart });
        const headers = {
            ...DEFAULT_HEADER,
            ...addonHeaders,
        };
        let dataReturn = null;
        const result = await instance.request({
            url,
            method,
            data,
            params,
            headers,
        }).then(data => { dataReturn = data });
        return dataReturn;
    } catch (error) {
        throw error;
    }
}
