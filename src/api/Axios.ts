import axios from "axios"

export const getUserList = async () => {
    const result = await axios.get('api/user');
    return result.data
}

export const getUserInfo = async () => {
    const result = await axios.get('api/user/1');
    return result.data
}

export const getArticleList = async () => {
    const result = await axios.get('api/articles');
    return result.data
}

export const getArticlesId = async (id: Number) => {
    const result = await axios.get(`api/articles/${id}`);
    return result.data
}

export const getCommentsId = async (id: Number) => {
    const result = await axios.get(`api/comments/${id}`);
    return result.data
}

export const getCommentsList = async () => {
    const result = await axios.get('api/comments');
    return result.data
}