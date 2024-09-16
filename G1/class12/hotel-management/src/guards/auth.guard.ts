import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { UserRole } from "../types/user-role.enum";

export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot, // Represents the current state of the route, including parameters, data, and the URL
): 
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree => {

        const authService = inject(AuthService);
        const router = inject(Router);

         // If not authenticated, redirect to login
        if (!authService.isAuth()) {
            return router.createUrlTree(['/login']);
        }

        // checks if the roles property exists in the data object of the route in the app.routes.ts
        // checks if specific role is required to access the route
        if(route.data?.['roles']) {
            const userRole = authService.currentUser()?.role; //gets the role of the current user

            if(!userRole) {
                return router.createUrlTree(['/not-allowed']);
            }

            if(!route.data['roles'].some((role: UserRole) => role === userRole)) {
                return router.createUrlTree(['/not-allowed']);
            }
        }
        return true;
    }
