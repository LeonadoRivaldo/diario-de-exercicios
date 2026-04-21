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
    deleteDoc,
} from 'firebase/firestore';
import { FirebaseService } from '../firebase/firebase';
import { AuthService } from '../auth/auth.service';
import { NotificationService } from '../notification/notification';
import Logger from '../logger';
import { DiaryEntry } from '../../models/exercise-diary.model';

@Injectable({ providedIn: 'root' })
export class DiaryService {

    // DEPS
    private notification = inject(NotificationService)
    private firebase = inject(FirebaseService);
    private authSvc = inject(AuthService);

    private col = collection(this.firebase.db, 'diary');

    get userId() {
        return this.authSvc.user()!.uid!;
    }

    async getAll() {
        try {
            const q = query(this.col, where('userId', '==', this.userId));
            const snap = await getDocs(q);
            this.notification.success("Diario carregado com sucesso!");
            return snap.docs.map((d) => ({
                id: d.id,
                ...d.data(),
            })) as DiaryEntry[];
        } catch (error) {
            this.notification.error("Diario não carregado");
            Logger.log("DiaryService::getAll", error);
            return [];
        }
    }

    async create(entry: any) {
        try {
            const result = await addDoc(this.col, entry);
            this.notification.success("Registro criado com sucesso!");
            return result;
        } catch (error) {
            this.notification.error("Registro não foi criado");
            Logger.log("DiaryService::create", error);
            return null
        }
    }

    async update(id: string, entry: any) {
        try {
            const result = await updateDoc(doc(this.firebase.db, 'diary', id), entry);
            this.notification.success("Registro atualizado com sucesso!");
            return result;
        } catch (error) {
            this.notification.error("Registro não foi atualizado");
            Logger.log("DiaryService::update", error);
            return null
        }
    }

    async remove(id: string) {
        try {
            const docRef = doc(this.firebase.db, 'diary', id);
            const result = await deleteDoc(docRef);
            this.notification.success("Registro removido com sucesso!");
            return result;
        } catch (error) {
            this.notification.error("Registro não foi removido");
            Logger.log("DiaryService::update", error);
            return null
        }
    }
}
