import axiosInstance from "../config/AxiosConfig"

const getAll = async ( ) => {
   try {
     const res = await axiosInstance.get('/user')
     return res.data    
   } catch (error) {
        console.error("Get products error:", error.response?.data || error.message);
        return {
            error: error.response?.data || "An error occurred while fetching products.",
        };
   }
}


const getRoles = async () =>{
  try {
    const res = await axiosInstance.get('/role')
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error.message)

  }
}

export const UserService = {
    getAll,
    getRoles
}