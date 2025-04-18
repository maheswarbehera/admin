import axiosInstance from "../config/AxiosConfig";


const getLogs = async () => {
    try {
        const res = await axiosInstance.get(`/logs`)
        return res.data
           
    } catch (error) {
        console.log(error.messages)
    }
}

export const LogService = {
    getLogs
}