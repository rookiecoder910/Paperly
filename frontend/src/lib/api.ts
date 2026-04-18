/**
 * Paperly API Client
 * Centralized HTTP client for communicating with the Go backend.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081/api";

const TOKEN_KEY = "paperly_token";

// ─── Token Management ─────────────────────────────────

export function getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
}

// ─── API Error ─────────────────────────────────────────

export class ApiError extends Error {
    status: number;
    details?: string;

    constructor(message: string, status: number, details?: string) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.details = details;
    }
}

// ─── Base Fetch Helper ────────────────────────────────

async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const token = getToken();

    const headers: Record<string, string> = {
        ...(options.headers as Record<string, string>),
    };

    // Add auth header if token exists
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    // Add JSON content type unless it's FormData
    if (!(options.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
    }

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!res.ok) {
        let errorMessage = "Request failed";
        let details: string | undefined;
        try {
            const errorData = await res.json();
            errorMessage = errorData.error || errorMessage;
            details = errorData.details;
        } catch {
            // Response wasn't JSON
        }
        throw new ApiError(errorMessage, res.status, details);
    }

    return res.json();
}

// ─── Auth Endpoints ───────────────────────────────────

export interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export async function apiSignup(name: string, email: string, password: string): Promise<AuthResponse> {
    return apiFetch<AuthResponse>("/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
    });
}

export async function apiLogin(email: string, password: string): Promise<AuthResponse> {
    return apiFetch<AuthResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
}

export async function apiGetMe(): Promise<User> {
    return apiFetch<User>("/auth/me");
}

// ─── OCR Endpoint ─────────────────────────────────────

export interface OcrResponse {
    text: string;
    confidence: number;
}

export async function apiExtractText(imageFile: File): Promise<OcrResponse> {
    const formData = new FormData();
    formData.append("image", imageFile);

    return apiFetch<OcrResponse>("/ocr", {
        method: "POST",
        body: formData,
    });
}

// ─── Handwriting Endpoint ─────────────────────────────

export interface HandwritingResponse {
    image: string; // base64-encoded PNG
    pages: number;
    lines: number;
}

export async function apiGenerateHandwriting(text: string): Promise<HandwritingResponse> {
    return apiFetch<HandwritingResponse>("/generate", {
        method: "POST",
        body: JSON.stringify({ text }),
    });
}

// ─── Health Check ─────────────────────────────────────

export async function apiHealthCheck(): Promise<{ status: string; version: string }> {
    return apiFetch("/health");
}
