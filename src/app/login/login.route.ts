import { Route } from "@angular/router";


const loginRoute: Route = {
  path: "login",
  loadComponent: () => import('./login').then( c => c.LoginComponent)
}


export default loginRoute;
