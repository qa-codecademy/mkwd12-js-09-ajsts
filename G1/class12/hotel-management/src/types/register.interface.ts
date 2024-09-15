import { Auth } from "./auth.interface";

export interface Register extends Auth {
    firstName: string;
    lastName: string;
}