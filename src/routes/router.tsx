import HomePage from "@/pages";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import SerchPage from "@/pages/search";
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
        element: <SerchPage />,
    }
])

export default router;