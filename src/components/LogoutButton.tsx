import React from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface LogoutButtonProps {
  variant?: "default" | "secondary" | "outline" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  showText?: boolean;
  className?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({
  variant = "destructive",
  size = "sm",
  showText = true,
  className = "",
}) => {
  const { logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out 🌿",
      description: "You have been logged out successfully.",
    });
    navigate("/", { replace: true });
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={`gap-2 ${className}`}
      onClick={handleLogout}
    >
      <LogOut className="w-4 h-4" />
      {showText && "Logout"}
    </Button>
  );
};

export default LogoutButton;
