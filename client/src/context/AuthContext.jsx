import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = async (data) => {
    try {
      const res = await registerRequest(data);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data);
    }
  };

  const signin = async (data) => {
    try {
      const res = await loginRequest(data);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data);
    }
  };

  const logout = async () => {
    try {
      const res = await logoutRequest();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (errors.length) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      if (cookies.token) {
        try {
          const res = await verifyTokenRequest();
          console.log(res.data)
          setUser(res.data)
          setIsAuthenticated(true);
        } catch (error) {
          console.log(error);
          // setIsAuthenticated(false);
          // setUser(null);
        }
      }
      setLoading(false);
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signup, signin, logout, user, isAuthenticated, errors, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
