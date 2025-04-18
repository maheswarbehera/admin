import React, { useEffect, useState } from 'react' 
import { UserService } from '../service/Users' 
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



const Roles = () => {
    const [roles, setRoles] = useState([])
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        document.title = "Roles"
        fetchRoles()
    },[])

    const fetchRoles = async() =>{
        const user = await UserService.getRoles()
        console.log(user.roles)
        setRoles(user.roles)
    }
  return (
    
        <> 
        <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Role', 'Permissions','Created At', 'Action'].map((header) => (
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
            {roles.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.name}
                </td>   
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  { item.permissions.map((p) => {
                   return (
                    <div key={p._id}>
                      {`Read: ${p.read ? '✔️' : '❌'}, Write: ${p.write ? '✔️' : '❌'}, Update: ${p.update ? '✔️' : '❌'}, Delete: ${p.delete ? '✔️' : '❌'}`}
                    </div>
                  );
                  })}
                </td>
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
    </>
  )
}

export default Roles