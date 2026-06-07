import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const AutoRedirect = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/dashboard", { replace: true });
    else navigate("/", { replace: true });
  }, [token, navigate]);

  return null; // nothing to render
};

export default AutoRedirect;
