
import { Routes, Route } from 'react-router-dom'
import PageNotFound from './components/404' 
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Category from './components/Catalog/Category'
import Product from './components/catalog/Product' 
import { Navigate, Outlet} from 'react-router-dom';
import useAuth from './hooks/useAuth' 
import Users from './pages/Users'
import Logs from './pages/Logs'
import Roles from './pages/Role'


const PrivateRoute = () => {
    const { token } = useAuth() 

    return token ? <Outlet /> : <Navigate to="/user/login" replace />;
  };

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="*" element={<PageNotFound/>} /> 
                <Route path="/user/login" element={<Login/>} />
{/* 
                <Route path="/dashboard" element={ <PrivateRoute>  <Dashboard /> </PrivateRoute>} />
                <Route path="/catalog/category" element={ <PrivateRoute>  <Category /> </PrivateRoute>} />
                <Route path="/catalog/product" element={ <PrivateRoute>  <Product /> </PrivateRoute>} /> 
                <Route element={<PrivateRoute />}> */}
       <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/catalog/category" element={<Category />} />
        <Route path="/catalog/product" element={<Product />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/roles" element={<Roles />} />
        <Route path="/system/logs" element={<Logs />} />
      </Route>
               
            </Routes>

        </>
    )
}

export default AppRoutes