import { Route, Routes } from '@angular/router';
import loginRoute from './login/login.route';
import { authGuard } from './core/guards/auth/auth.guard';
import dashboardRoute from './dashboard/dashboard.route';

const diaryRoute: Route = {
	path: 'diary',
	loadComponent: () => import('./core/components/exercise-diary-entry/exercise-diary-entry.component').then((c) => c.ExerciseDiaryEntryComponent),
};

const routes: Routes = [ dashboardRoute, diaryRoute];
routes.forEach((route) => {
		if (route.canActivate) {
			route.canActivate.push(authGuard);
		} else {
			route.canActivate = [authGuard];
		}
});

routes.push(loginRoute);
routes.push({ path: '**', redirectTo: '/dashboard' });

export { routes };
