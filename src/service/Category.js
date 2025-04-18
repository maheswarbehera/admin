import axiosInstance from "../config/AxiosConfig";

const getAll = async () => {
    try {
        const res = await axiosInstance.get(`/category`);
        return res.data.categories;
    } catch (err) {
        console.error("Get categories error:", err.response?.data || err.message);
        return {
        error: err.response?.data || "An error occurred while fetching categories.",
        };
    }
}

const saveOrUpdate = async (category) => {
    try {
        const res = await axiosInstance.post(`/category/saveOrUpdate`, category);
        return res.data;
    } catch (err) {
        console.error("Create category error:", err.response?.data || err.message);
        return {
        error: err.response?.data || "An error occurred while creating the category.",
        };
    }
}
const edit = async (id,category) => {
    try {
        const res = await axiosInstance.put(`/category/edit/${id}`, category);
        return res.data;
    } catch (err) {
        console.error("Edit category error:", err.response?.data || err.message);
        return {
        error: err.response?.data || "An error occurred while editing the category.",
        };
    }
}
const deleteCat = async (id) => {
    try {
        const res = await axiosInstance.delete(`/category/${id}` );
        return res.data;
    } catch (err) {
        console.error("Delete category error:", err.response?.data || err.message);
        return {
        error: err.response?.data || "An error occurred while deleting the category.",
        };
    }
}

export const CategoryService = {
    getAll,
    saveOrUpdate,
    deleteCat,
    edit
};