import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function OAuth2Redirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOAuthData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/auth/loginSuccess", {
          withCredentials: true
        });

        const { token, role } = response.data;

        if (token && role) {
          localStorage.setItem("token", token);
          localStorage.setItem("role", role);

          toast.success("Login successful!");

          if (role === "ADMIN") navigate("/admin");
          else if (role === "USER") navigate("/user");
          else navigate("/");
        } else {
          toast.error("OAuth login failed!");
          navigate("/");
        }
      } catch (error) {
        toast.error(error.response?.data?.error || "OAuth login failed!");
        navigate("/");
      }
    };

    fetchOAuthData();
  }, [navigate]);

  return <div className="text-center mt-10">Redirecting...</div>;
}
