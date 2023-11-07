import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function HomePage() {

    const user = useContext(UserContext);

    return (
        <>
            <pre>
                {JSON.stringify(user, null, 2)}
            </pre>
        </>
    )
}

export default HomePage