import { Component, effect, inject, OnInit, signal } from "@angular/core";
import { DiaryService } from "../core/services/diary/diary.service";
import { CommonModule } from "@angular/common";
import { ModalComponent } from "../core/components/modal/modal";
import { ExerciseDiaryComponent } from "../core/components/exercise-diary/exercise-diary.component";
import { ActionCardComponent } from "../core/components/action-card/action-card";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { DiaryEntry } from "../core/models/exercise-diary.model";
import { AuthService } from "../core/services/auth/auth.service";

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.html',
	imports: [CommonModule, ModalComponent, ExerciseDiaryComponent, ActionCardComponent],
	styleUrl: './dashboard.scss',
})
export class DashboardComponent{
    readonly newLogIcon = signal(faDumbbell);
    loading = signal(false);
    entries = signal<any[]>([]);
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
        this.entries.set(data);
        this.loading.set(false);
    }

    toggleModal() {
		this.openModal.set(!this.openModal());
	}

    onCloseModal(reason: any) {
        this.toggleModal();
        // this.selectedEntry.set(null);
    }

    editEntry(entry: any) {
        this.selectedEntry.set(entry);
        this.toggleModal();
    }

}
