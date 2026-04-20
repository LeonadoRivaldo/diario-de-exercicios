import { Route } from '@angular/router';

const dashboardRoute: Route = {
	path: 'dashboard',
	loadComponent: () => import('./dashboard').then((c) => c.DashboardComponent),
};

export default dashboardRoute;
