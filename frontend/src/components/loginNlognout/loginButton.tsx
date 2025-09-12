import { useAuth } from "./first";
import { login, logout } from "../../utils/loginNlogout";
//@ts-ignore
import { usePathname } from "next/navigation";

export default function LoginButton() {
    const path = usePathname();
    const { user, isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return (
            <button onClick={() => logout()}>Logout</button>
        );
    } else {
        return (
            <button onClick={() => login(path)}>Login</button>
        );
    }
}