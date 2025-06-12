import { create } from 'zustand'
import { getMyTodos } from '../api/user';

const useTodoStore = create((set) => ({
    todoData: {
        currentPage: 1,
        todoItems: [],
        total: 0,
        totalPages: 0,
    },

    actionGetAllTodos: async (token, page = 1) => {
        const res = await getMyTodos(token, page)
        set({ todoData: res.data.results })
    },
}));

export default useTodoStore
