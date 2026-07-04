import React, { createContext, useState, useEffect } from "react";
import { authService } from "../services/authService";
import { authAPI } from "../services/api";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = authService.getToken();
    if (token) {
      authAPI
        .getMe()
        .then((res) => setUser(res.data.user))
        .catch(() => authService.clearSession())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const res = await authAPI.login({ username, password });
      authService.setSession(res.data.token, res.data.user);
      setUser(res.data.user);
      toast.success("Welcome back!");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
      return false;
    }
  };

  const signup = async (username, email, password) => {
    try {
      const res = await authAPI.signup({ username, email, password });
      authService.setSession(res.data.token, res.data.user);
      setUser(res.data.user);
      toast.success("Account created!");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.error || "Signup failed");
      return false;
    }
  };

  const logout = () => {
    authService.clearSession();
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
