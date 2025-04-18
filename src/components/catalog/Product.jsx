import { useEffect, useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  LinearProgress,
  TablePagination,
} from '@mui/material';
import { ProductService } from '../../service/Product';
import { CategoryService } from '../../service/Category';
import notifyService from '../shared/service/notifyService';
import RefreshIcon from '@mui/icons-material/Refresh';
import ConfirmDialog from '../shared/service/sweetAlert';

const ProductForm = ({ title, open, onClose, onSubmit, initialData = {} }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sku: '',
    price: '',
    stock: '',
    category: '',
  });

  console.log(initialData)
 
  useEffect(() => {
    fetchCategories();
    setFormData({
      name: initialData.name || '',
      description: initialData.description || '',
      sku: initialData.sku || '',
      price: initialData.price || '',
      stock: initialData.stock || '',
      category: initialData.category || initialData.category || '',
    });
  }, [initialData]);
  console.log(formData.category)
  const fetchCategories = async () => {
    try {
      const response = await CategoryService.getAll();
      setCategories(response);
    } catch (err) {
      notifyService.error("Failed to fetch categories");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { name, sku, price, stock, category } = formData;
    if (!name || !sku || !price || !stock || !category) {
      notifyService.error('Please fill all fields');
      return;
    }
    await onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {['name', 'description', 'sku', 'price', 'stock'].map((field) => (
          <TextField
            key={field}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            name={field}
            fullWidth
            variant="outlined"
            margin="dense"
            value={formData[field]}
            onChange={handleChange}
          />
        ))}
        <FormControl fullWidth margin="dense">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            name="category"
            value={formData.category}
            onChange={handleChange}
            label="Category"
          >
            {categories.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Product = () => {
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    document.title = 'Product';
    fetchProducts(page, pageSize);
  }, [page, pageSize]);

  const fetchProducts = async (page, pageSize) => {
    setLoading(true);
    try {
      const response = await ProductService.getAll( page, pageSize );
      setProducts(response.products); // Assuming response contains a 'products' field
      setTotal(response.total); // Assuming response contains 'total' field
    } catch {
      notifyService.error('Error fetching products!');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data) => {
    try {
      const response = editData
        ? await ProductService.edit(editData._id, data)
        : await ProductService.create(data);

      if (response.status) {
        notifyService.success(response.message)
        fetchProducts(page, pageSize);
        setEditData(null);
        setIsDialogOpen(false);
      }else {
        notifyService.error(response.error.message);
      }
    } catch (error) {
      notifyService.error(error?.message);
    }
  };

  const handleEdit = (item) => {
    setEditData(item);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (await ConfirmDialog()) {
      try {
        const response = await ProductService.deletePro(id);
        setProducts((prev) => prev.filter((item) => item._id !== id));
        notifyService.success(response.message);
      } catch (error) {
        notifyService.error(error?.message);
      }
    }
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="my-4">
        <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
          Add New Product
        </Button>
        <ProductForm
          title={editData ? 'Edit Product' : 'Add New Product'}
          open={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setEditData(null);
          }}
          onSubmit={handleSave}
          initialData={editData || {}}
        />
        <Button variant="text" onClick={() => fetchProducts(page, pageSize)}>
          <RefreshIcon />
        </Button>
      </div>
      <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Name', 'Description',"Category", 'SKU', 'Price', 'Stock', 'Created At', 'Action'].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category.map((c) => c.name).join(', ')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.sku}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900 ml-4"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <TablePagination
            component="div"
            count={total}
            page={page - 1}
            onPageChange={(e, newPage) => setPage(newPage + 1)}
            rowsPerPage={pageSize}
            onRowsPerPageChange={(e) => {
              setPageSize(parseInt(e.target.value, 10));
              setPage(1); // Reset to first page
            }}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
        </div>

        {loading && <LinearProgress />}
      </div>
    </div>
  );
};

export default Product;
