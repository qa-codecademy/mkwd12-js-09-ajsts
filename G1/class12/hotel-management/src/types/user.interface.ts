import { UserRole } from "./user-role.enum";

export interface User {
    id?: string;
    email: string;
    role: UserRole;
    guestId?: string;
    refreshTokens?: string[];
}