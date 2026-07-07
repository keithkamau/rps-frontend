import { useState, useEffect, useCallback } from "react";
import { authService } from "../services/authService";
import { authAPI } from "../services/api";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContextValue";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(() => {
    const token = authService.getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    const cachedUser = authService.getUser();
    if (cachedUser) {
      setUser(cachedUser);
    }

    authAPI
      .getMe()
      .then((res) => {
        setUser(res.data.user);
        authService.setSession(token, res.data.user);
      })
      .catch(() => {
        authService.clearSession();
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (username, password) => {
    const res = await authAPI.login({ username, password });
    authService.setSession(res.data.token, res.data.user);
    setUser(res.data.user);
    toast.success("Welcome back!");
    return true;
  };

  const signup = async (username, email, password) => {
    const res = await authAPI.signup({ username, email, password });
    authService.setSession(res.data.token, res.data.user);
    setUser(res.data.user);
    toast.success("Account created!");
    return true;
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
        refreshUser: checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
