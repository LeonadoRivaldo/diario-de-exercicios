import { Component, effect, inject, signal } from '@angular/core';
import { ExerciseDiaryEntryComponent } from "../exercise-diary-entry/exercise-diary-entry.component";
import { ModalComponent } from "../modal/modal";
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { DiaryEntry } from '../../models/exercise-diary.model';
import { AuthService } from '../../services/auth/auth.service';
import { DiaryService } from '../../services/diary/diary.service';
import { CommonModule } from '@angular/common';
import { ActionCardComponent } from "../action-card/action-card";

@Component({
    selector: 'app-exercise-diary-history',
    imports: [ExerciseDiaryEntryComponent, ModalComponent, CommonModule, ActionCardComponent],
    templateUrl: './exercise-diary-history.html',
    styleUrl: './exercise-diary-history.scss',
})
export class ExerciseDiaryHistoryComponent {
    readonly newLogIcon = signal(faDumbbell);
    loading = signal(true);
    entries = signal<DiaryEntry[]>([]);
	openModal = signal(false);
    modalOptions = signal({ fullscreen: true });
    selectedEntry = signal<null | DiaryEntry>(null);

    private diaryService = inject(DiaryService);
    private auth = inject(AuthService);

    private loadEffect = effect(() => {
        const user = this.auth.user();

        if (user) {
            this.load();
        }
    });

    async load() {
        this.loading.set(true);
        const data = await this.diaryService.getAll();
        data.sort((a, b) => {
            const aDate = new Date(a.date);
            const bDate = new Date(b.date);
            return aDate.getMilliseconds() - bDate.getMilliseconds();
        });
        this.entries.set(data);
        this.loading.set(false);
    }

    toggleModal(state: boolean) {
		this.openModal.set(state);
	}

    onCloseModal(reason: any) {
        this.toggleModal(false);
        // this.selectedEntry.set(null);
    }

    editEntry(entry: DiaryEntry) {
        this.selectedEntry.set(entry);
        this.toggleModal(true);
    }

    async removeEntry(entry: DiaryEntry) {

        const remove = confirm("Voce tem certeza que quer realizar esta ação?");
        const { id } = entry;

        if (!id || !remove) {
            return;
        }

        await this.diaryService.remove(id);
        this.load();
    }

    entrySaved() {
        this.toggleModal(false);
        this.load();
    }
}
