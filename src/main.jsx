import "./globals.css";
import React from "react";
import ReactDOM from "react-dom/client";
import FillApplication from "@/pages/FillApplication/Index";
import Login from "@/pages/Login";
import Students from "@/pages/Students";
import MainLayout from "@/layouts/MainLayout";
import routes from "./routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { QueryClient, QueryClientProvider } from "react-query";
import NotFound from "./pages/NotFound";

export const Main = () => {
    const user = useAuth();

    const getRoutesByRole = (userRole) => {
        if (!user) return [];
        return routes
            .filter((route) => route.roles.includes(userRole))
            .map((route, i) => (
                <Route
                    path={route.path}
                    element={<route.page />}
                    key={route.path + i}
                />
            ));
    };

    return (
        <React.StrictMode>
            <QueryClientProvider client={new QueryClient()}>
            <div className="h-screen">
                <BrowserRouter>
                    <Routes>
                        <Route path='*' element={<NotFound />} />
                        <Route element={<MainLayout />}>
                            {getRoutesByRole(user?.role)}
                        </Route>
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </BrowserRouter>
            </div>
            </QueryClientProvider>
        </React.StrictMode>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
