import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import HomePage from "@/pages";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import NavigationPage from "@/pages/navigation";
import RouteSearchPage from "@/pages/routes";
import SerchPage from "@/pages/search";
import TestPage from "@/pages/test";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/auth/register",
        element: <RegisterPage />,
    },
    {
        path: "/auth/login",
        element: <LoginPage />,
    },
    {
        path: "/search",
        element: <ProtectedRoute><SerchPage /></ProtectedRoute>,
    },
    {
        path: "/routesSearch",
        element: <RouteSearchPage />
    },
    {
        path: "/navigation",
        element: <NavigationPage />
    },
    {
        path: "/test",
        element: <TestPage />
    }
])

export default router;