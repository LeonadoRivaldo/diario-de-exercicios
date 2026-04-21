import { Component, signal } from '@angular/core';
import { faArrowRightToBracket, faDumbbell, faListCheck, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { User } from 'firebase/auth';
import { AuthService } from '../../services/auth/auth.service';
import { MenuComponent } from '../menu/menu';
import FONT_AWESOME_IMPORTS from '../../imports/fontawesome.imports';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import SHARED_IMPORTS from '../../imports/shared.imports';


@Component({
	selector: 'app-header',
	imports: [MenuComponent, ...FONT_AWESOME_IMPORTS, ...SHARED_IMPORTS,],
	templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
    readonly appName = signal(faDumbbell);
    readonly logInIcon = signal(faArrowRightToBracket);
	readonly logoutIcon = signal(faPowerOff)

	constructor(private readonly authService: AuthService, private readonly router:Router) {
    }

    get user() {
        return this.authService.user();
    }

    login() {
        this.router.navigateByUrl("/login");
    }

	logout() {
		this.authService.logout();
	}
}
