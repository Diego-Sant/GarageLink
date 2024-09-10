import { defer } from "react-router-dom";

import apiRequest from "./apiRequest"

export const singlePageLoader = async ({request, params}) => {
    const res = await apiRequest("/publicacoes/"+params.id)
    return res.data;
};

export const listPageLoader = async ({request, params}) => {
    const query = request.url.split("?")[1]
    const postPromise = apiRequest("/publicacoes?"+query)
    return defer({
        postResponse: postPromise
    });
};

export const profilePageLoader = async () => {
    const postPromise = apiRequest("/usuarios/postagens");
    const chatPromise = apiRequest("/chats");
    return defer({
        postResponse: postPromise,
        chatResponse: chatPromise,
    });
}