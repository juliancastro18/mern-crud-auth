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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (data) => {
    try {
      const res = await registerRequest(data);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (e) {
      setError(e.response.data.errors);
    }
  };

  const signin = async (data) => {
    try {
      const res = await loginRequest(data);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (e) {
      setError(e.response.data.errors);
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
      setUser(null);
      setIsAuthenticated(false);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      if (cookies.token) {
        try {
          const res = await verifyTokenRequest();
          console.log(res.data)
          setUser(res.data)
          setIsAuthenticated(true);
        } catch (e) {
          console.log(e);
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
      value={{ signup, signin, logout, user, isAuthenticated, error, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
