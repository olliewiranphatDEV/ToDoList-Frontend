// src/store.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
    persist(
        (set) => ({
            // STATE
            token: null,
            userData: null, // { id, email, firstName, lastName }

            // ACTIONS 
            setToken: (token) => set({ token }),
            setUserData: (userData) => set({ userData }),

            signout: () => {
                localStorage.removeItem("auth-user-storage");
                set({
                    token: null,
                    userData: null,
                });
            }
        }),
        {
            name: 'auth-user-storage', // key in localStorage
            getStorage: () => localStorage, // default localStorage 
        }
    )
)

export default useAuthStore
