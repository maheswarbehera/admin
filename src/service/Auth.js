import axiosInstance from "../config/AxiosConfig";


const login = async (username, password) => {
    try {
        const res = await axiosInstance.post(`/user/login`, { username, password });
        const {accessToken} = res.data.data
        return accessToken;

    } catch (err) {
        console.error("Login error:", err.response?.data || err.message);
        return {
            error: err.response?.data || "An error occurred while logging in.",
        };
    }
}

const logout = () => {
    localStorage.removeItem("jwtToken");
}


export const AuthService = {
    login,
    logout,
};