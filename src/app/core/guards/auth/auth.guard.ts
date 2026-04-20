import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = (
	route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot,
) => {
	const authService = inject(AuthService);
	const router = inject(Router);
	const authenticated = authService.isAuthenticated();
	if (!authenticated) {
		router.navigateByUrl("login");
		return false;
	}

	return authenticated;
};
