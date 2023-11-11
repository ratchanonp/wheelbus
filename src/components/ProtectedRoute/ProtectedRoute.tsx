import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    children: React.ReactNode
}

function ProtectedRoute({ children }: Props) {

    const { user, isloading } = useContext(UserContext);
    const navigate = useNavigate();

    if (isloading) { return <></> }
    if (!user) { navigate('/auth/login'); return null }

    return children
}

export default ProtectedRoute