import { Injectable, inject } from '@angular/core';
import {
    Firestore,
    collection,
    addDoc,
    query,
    where,
    getDocs,
    doc,
    updateDoc,
} from 'firebase/firestore';
import { FirebaseService } from '../firebase/firebase';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DiaryService {

    private firebase = inject(FirebaseService);
    private authSvc = inject(AuthService);
    private col = collection(this.firebase.db, 'diary');

    get userId() {
        return this.authSvc.user()!.uid!;
    }

    async getAll() {
        const q = query(this.col, where('userId', '==', this.userId));
        const snap = await getDocs(q);

        return snap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
        })) as any[];
    }

    async create(entry: any) {
        return addDoc(this.col, entry);
    }

    async update(id: string, entry: any) {
        return updateDoc(doc(this.firebase.db, 'diary', id), entry);
    }
}
