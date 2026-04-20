import { Component, signal } from '@angular/core';
import { form, FormField, disabled, required, email } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth/auth.service';
import SHARED_IMPORTS from '../core/imports/shared.imports';

interface LoginData {
    email: string;
    password: string;
}

@Component({
    selector: 'app-login',
    imports: [...SHARED_IMPORTS, FormField],
    templateUrl: './login.html',
    styleUrl: './login.scss',
})
export class LoginComponent {
    loginInfo = signal<LoginData>({
        email: '',
        password: '',
    });
    loginForm = form(this.loginInfo, (schemaPath) => {
        required(schemaPath.email);
        required(schemaPath.password);
        email(schemaPath.email);
    });
    error = signal("");

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    async login() {
        const { email, password } = this.loginInfo();
        try {
            await this.authService.login(email, password);
            this.router.navigateByUrl('/');
        } catch (error: any) {
            this.error.set(error.message);
            setTimeout(() => {
                this.error.set("");
            }, 5000);
        }
    }
}
