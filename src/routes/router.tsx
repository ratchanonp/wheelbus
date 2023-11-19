import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import HomePage from "@/pages";
import ForgetPasswordPage from "@/pages/auth/forgetPassword";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import FavoriteAddPage from "@/pages/favorite/add";
import FavoritePage from "@/pages/favorite/favorite";
import NavigationPage from "@/pages/navigation";
import EditProfilePage from "@/pages/profile/edit";
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
        path: "/auth/forgot-password",
        element: <ForgetPasswordPage />,
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
    },
    {
        path: "favorites",
        element: <ProtectedRoute><FavoritePage /></ProtectedRoute>,
    },
    {
        path: "favorites/add",
        element: <ProtectedRoute><FavoriteAddPage /></ProtectedRoute>,
    },
    {
        path: "profile/edit",
        element: <ProtectedRoute><EditProfilePage /></ProtectedRoute>
    }
])

export default router;