import apiRequest from "./apiRequest"

export const singlePageLoader = async ({request, params}) => {
    const res = await apiRequest("/publicacoes/"+params.id)
    return res.data;
};

export const listPageLoader = async ({request, params}) => {
    const query = request.url.split("?")[1]
    const res = await apiRequest("/publicacoes?"+query)
    return res.data;
}