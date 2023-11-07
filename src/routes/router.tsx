import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages";
import LoginPage from "../pages/auth/login";
import RegisterPage from "../pages/auth/register";

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
    }
])

export default router;