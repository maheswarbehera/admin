import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/AuthContext.jsx';
import AppRoutes from './Route.jsx';
import Login from './components/Login.jsx';
import { useContext, forwardRef, useEffect } from 'react';
import { AuthContext } from './context/AuthContext.jsx';
import Dashboard from './components/Dashboard.jsx';
import { MultiLevelSidebar } from './components/defaultSidebar.jsx';
import useAuth from './hooks/useAuth.jsx';

// Custom Snackbar Component
const CustomSnackbar = forwardRef(({ message, style }, ref) => (
  <div ref={ref} style={{ ...style, padding: '10px', borderRadius: '4px' }}>
    {message}
  </div>
));


const Wrapper = () => ( 
    <BrowserRouter>
      <AuthProvider>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          Components={{
            success: forwardRef((props, ref) => <CustomSnackbar ref={ref} {...props} style={{ backgroundColor: '#4CAF50', color: 'white' }} />),
            error: forwardRef((props, ref) => <CustomSnackbar ref={ref} {...props} style={{ backgroundColor: '#F44336', color: 'white' }} />),
            warning: forwardRef((props, ref) => <CustomSnackbar ref={ref} {...props} style={{ backgroundColor: '#FF9800', color: 'white' }} />),
            info: forwardRef((props, ref) => <CustomSnackbar ref={ref} {...props} style={{ backgroundColor: '#2196F3', color: 'white' }} />),
          }}
        >
          <App />
        </SnackbarProvider>
      </AuthProvider>
    </BrowserRouter>
  );

  function App() {
    const { token } = useAuth();
  
    return token ? (
      <>
        <MultiLevelSidebar />
        <AppRoutes />
      </>
    ) : (
      <Login />
    );
  }
  

export default Wrapper;
