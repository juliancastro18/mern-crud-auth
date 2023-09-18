import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  const signup = async (data) => {
    try {
      const res = await registerRequest(data);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response.data)
      setErrors(error.response.data);
    }
  };

  const signin = async (data) => {
    try {
      const res = await loginRequest(data);
      console.log(res.data);
      // setUser(res.data);
      // setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response.data)
      setErrors(error.response.data);
    }
  }

  useEffect(() => {
    if (errors.length) {
      const timer = setTimeout(() => {
        setErrors([])
      }, 5000)
      return () => clearTimeout(timer);
    }
  }, [errors])

  return (
    <AuthContext.Provider value={{ signup, signin, user, isAuthenticated, errors }}>
      {children}
    </AuthContext.Provider>
  );
};