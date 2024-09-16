import { UserRole } from "./user-role.enum";

export interface AuthResponse {
    token: string;
    refreshToken: string;
    email: string;
    role: UserRole;
}