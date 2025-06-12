import axios from "axios"
const BASE_URL = import.meta.env.VITE_API_URL
import useAuthStore from "../store/useAuthStore";

const { setToken, setUserData } = useAuthStore.getState();

export const authSignUp = async (value) => {
    return await axios.post(`${BASE_URL}/auth/register`, value)
}

export const authSignIn = async (value) => {
    return await axios.post(`${BASE_URL}/auth/signin`, value)
        .then(res => {
            console.log('res >>', res);

            const token = res.data.token;
            const userData = res.data.result;

            setToken(token);
            setUserData(userData);
        });
};
