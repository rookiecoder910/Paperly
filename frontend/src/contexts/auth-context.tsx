"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
    apiLogin,
    apiSignup,
    apiGetMe,
    getToken,
    setToken,
    removeToken,
    type User,
} from "@/lib/api";

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // On mount, check for existing token and validate it
    useEffect(() => {
        const token = getToken();
        if (!token) {
            setIsLoading(false);
            return;
        }

        apiGetMe()
            .then((u) => setUser(u))
            .catch(() => {
                // Token invalid or expired — clean up
                removeToken();
            })
            .finally(() => setIsLoading(false));
    }, []);

    const login = async (email: string, password: string) => {
        if (!email || !password) throw new Error("Email and password are required");

        const res = await apiLogin(email, password);
        setToken(res.token);
        setUser(res.user);
        router.push("/dashboard");
    };

    const signup = async (name: string, email: string, password: string) => {
        if (!name || !email || !password)
            throw new Error("All fields are required");

        const res = await apiSignup(name, email, password);
        setToken(res.token);
        setUser(res.user);
        router.push("/dashboard");
    };

    const logout = () => {
        removeToken();
        setUser(null);
        router.push("/");
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
    return ctx;
}
