import axios from "axios"
const BASE_URL = import.meta.env.VITE_API_URL


export const getMyTodos = async (token, page = 1) => {
    return await axios(`${BASE_URL}/user/all-todoitems?page=${page}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
}

export const createTodo = async (token, todoTitle) => {
    return await axios.post(`${BASE_URL}/user/new-todoitem`,
        { title: todoTitle },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
}

export const updateTodo = async (token, todoID, value) => { // STATUS?/TITLE? - CHECK UPDATE AT BACKEND
    return await axios.patch(`${BASE_URL}/user/update-todoitem/${todoID}`,
        value,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
}

export const deleteTodo = async (token, todoID) => {
    return await axios.delete(`${BASE_URL}/user/delete-todoitem/${todoID}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
}