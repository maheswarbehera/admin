import { useEffect } from "react";
import { createContext, useState } from "react"; 
import PropTypes from "prop-types"; 

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem("jwtToken") || null); 

    useEffect(() => { 
        if (token) {
            localStorage.setItem("jwtToken", token);
        } else {
            localStorage.removeItem("jwtToken");
        }
        
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken  }}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;