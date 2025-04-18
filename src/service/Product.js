
import axiosInstance from "../config/AxiosConfig";

const getAll = async (page, pageSize) => {
    try {
        const res = await axiosInstance.get(`/product?page=${page}&pageSize=${pageSize}`);
        return res.data;
    } catch (error) {
        console.error("Get products error:", error.response?.data || error.message);
        return {
            error: error.response?.data || "An error occurred while fetching products.",
        };
    }
}

const deletePro = async (id) => {
    try {
        const res = await axiosInstance.delete(`/product/id/${id}`);
        return res.data;
    } catch (error) {
        console.error("Delete product error:", error.response?.data || error.message);
        return {
            error: error.response?.data || "An error occurred while deleting the product.",
        };
    }
}

const create = async (product) => {
    try{
        const res = await axiosInstance.post(`/product/create`, product);
        
        return res.data;
    }catch(error){
        console.error("Create product error:", error.response?.data || error.message);
        return {
            error: error.response?.data || "An error occurred while creating the product.",
        };
    }
}

export const ProductService = {
    getAll,
    deletePro,
    create
};
