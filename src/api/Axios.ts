import axios from "axios"

export const getUserList = async () => {
    const result = await axios.get('/api/user');
    return result.data
}

export const getUserInfo = async (id : Number) => {
    const result = await axios.get(`/api/user/${id}`);
    return result.data
}

export const getArticleList = async () => {
    const result = await axios.get('/api/articles');
    return result.data
}

export const getArticlesId = async (id: Number) => {
    const path = `/api/articles/${id}`
    const result = await axios.get(path);
    return result.data
}

export const getCommentsId = async (id: Number) => {
    const result = await axios.get(`/api/comments/${id}`);
    return result.data
}

export const getCommentsList = async () => {
    const result = await axios.get('/api/comments');
    return result.data
}