import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const AuthContext = createContext({});

function getToken() {
  return localStorage.getItem("auth");
}

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getToken());
  const navigate = useNavigate();

  const login = async (credential) => {
    const toastId = toast.loading("Authenticating...");

    const response = await fetch(
      "https://taskify-api.vercel.app/api/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...credential }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("auth", JSON.stringify(data.token));
      const user = { name: data.name, email: data.email };
      localStorage.setItem("user", JSON.stringify(user));
      setToken(data.token);
      navigate("/");
      toast.success("Logged in successfully", { id: toastId });
    } else {
      toast.error(data.error, { id: toastId });
    }
  };

  const signup = async (credential) => {
    const toastId = toast.loading("Loading...");

    const response = await fetch(
      "https://taskify-api.vercel.app/api/user/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...credential }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      navigate("/login");
      toast.success("Registered successfully", { id: toastId });
    } else {
      toast.error(data.error, { id: toastId });
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    setToken(null);
    toast.success("Logout successfully");
  };

  const isAuthenticated = () => {
    return token !== null;
  };

  const getProfile = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  return (
    <AuthContext.Provider
      value={{ token, signup, login, logout, isAuthenticated, getProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
