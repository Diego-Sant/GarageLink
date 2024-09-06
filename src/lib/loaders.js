import apiRequest from "./apiRequest"

export const singlePageLoader = async ({req, params}) => {
    const res = await apiRequest("/publicacoes/"+params.id)
    return res.data;
}