import { AuthProvider } from "../hooks/useUser";

export function Providers({ children }) {
    return (
        <AuthProvider>{children}</AuthProvider>
    );
}