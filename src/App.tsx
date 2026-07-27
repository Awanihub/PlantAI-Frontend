import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import { AuthProvider } from "./context/AuthContext";
import AuthRouter from "./components/AuthRouter";

import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import PlantIdentify from "./pages/PlantIdentify";
import PlantDetails from "./pages/PlantDetails";
import Learn from "./pages/Learn";
import HealthCheck from "./pages/HealthCheck";
import Reminders from "./pages/Reminders";
import AutoRedirect from "./pages/AutoRedirect";
import PlantChat from "./pages/PlantChat";
import Garden from "./pages/Garden";


const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* AuthRouter decides public vs protected */}
              <Route element={<AuthRouter />}>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />

                {/* Protected routes */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/identify" element={<PlantIdentify />} />
                <Route path="/plant-details" element={<PlantDetails />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/health-check" element={<HealthCheck />} />
                <Route path="/reminders" element={<Reminders />} />
                <Route path="/plant-chat" element={<PlantChat />} />
                <Route path="/garden" element={<Garden />} />

                {/* Catch-all */}
                <Route path="*" element={<AutoRedirect />} />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
