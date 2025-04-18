import { useEffect, useState } from "react";
import { CategoryService } from "../../service/Category";
import {
    TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, LinearProgress
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import notifyService from "../shared/service/notifyService";
import ConfirmDialog from "../shared/service/sweetAlert";

// Category Form Component
const CategoryForm = ({ title, open, onClose, onSubmit, initialData = {} }) => {
    const [formData, setFormData] = useState({ name: "", description: "" });

    useEffect(() => {
        setFormData({ name: initialData.name || "", description: initialData.description || "" });
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.description) {
            notifyService.error("Please fill all fields");
            return;
        }
        await onSubmit(formData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <TextField
                    label="Category"
                    name="name"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={formData.name}
                    onChange={handleChange}
                />
                <TextField
                    label="Description"
                    name="description"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={formData.description}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

// Main Category Component
const Category = () => {
    const [categories, setCategories] = useState([]);
    const [editData, setEditData] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "Category";
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const category = await CategoryService.getAll();
            setCategories(category);
        } catch (error) {
            notifyService.error("Error fetching categories!");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (await ConfirmDialog()) {
            try {
                const data = await CategoryService.deleteCat(id);
                setCategories((prev) => prev.filter((item) => item._id !== id));
                notifyService.success(data.message);
            } catch (error) {
                notifyService.error(error?.message);
            }
        }
    };

    const handleEdit = (item) => {
        setEditData(item);
        setIsDialogOpen(true);
    };

    const handleSave = async (updatedData) => {
        try {
            let data;
            if (editData) {
                data = await CategoryService.edit(editData._id, updatedData);
            } else {
                data = await CategoryService.saveOrUpdate(updatedData);
            }

            if (data.status) {
                notifyService.success(editData ? "Category updated successfully!" : "Category created successfully!");
                fetchCategories();
                setIsDialogOpen(false);
                setEditData(null);
            } else {
                throw new Error(data.error?.message || "An error occurred");
            }
        } catch (error) {
            notifyService.error(error?.message);
        }
    };

    return (
        <div className="p-4 sm:ml-64">
            <div className="my-4">
            <Button variant="contained" onClick={() => setIsDialogOpen(true)}>Add New Category</Button>
            <CategoryForm
                title={editData ? "Edit Category" : "Add New Category"}
                open={isDialogOpen}
                onClose={() => {setIsDialogOpen(false); setEditData(null);}}
                onSubmit={handleSave}
                initialData={editData || {}}
            />

            <Button variant="text" onClick={fetchCategories}>
                <RefreshIcon />
            </Button>
            </div>

            <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700">
                
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {["Name", "Description", "Action"].map((header) => (
                                    <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {categories.map((item) => (
                                <tr key={item._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {item.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {item.description}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button className="text-indigo-600 hover:text-indigo-900" onClick={() => handleEdit(item)}>Edit</button>
                                        <button className="text-red-600 hover:text-red-900 ml-4" onClick={() => handleDelete(item._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {loading && <LinearProgress /> }
            </div>
        </div>
    );
};

export default Category;
