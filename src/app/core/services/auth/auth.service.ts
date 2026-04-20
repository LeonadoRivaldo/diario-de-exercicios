import { Injectable, signal } from '@angular/core';

import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    User,
    onAuthStateChanged,
} from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase/firebase';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    user = signal<User | null>(null);

    constructor(
        private readonly firebase: FirebaseService,
        private readonly storage: LocalStorageService,
        private readonly router: Router,
    ) {
        onAuthStateChanged(this.firebase.auth, (user) => {
            this.storage.setItem('authenticated', !!user);
            this.user.set(user);
        });
    }

    isAuthenticated(): boolean {
        return this.storage.getItem('authenticated') == 'true';
    }

    login(email: string, password: string) {
        return signInWithEmailAndPassword(this.firebase.auth, email, password);
    }

    // register(email: string, password: string) {
    // 	return createUserWithEmailAndPassword(this.firebase.auth, email, password);
    // }

    // googleLogin() {
    // 	const provider = new GoogleAuthProvider();
    // 	return signInWithPopup(this.firebase.auth, provider);
    // }

    async logout() {
        try {
            await signOut(this.firebase.auth);
            this.storage.setItem('authenticated', false);
            this.router.navigateByUrl('login');
        } catch (error) {}
    }
}
