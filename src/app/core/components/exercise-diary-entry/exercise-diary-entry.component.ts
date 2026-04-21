import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiaryService } from '../../services/diary/diary.service';
import { DiaryEntry, Exercise } from '../../models/exercise-diary.model';

@Component({
    selector: 'app-exercise-diary',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './exercise-diary-entry.component.html',
})
export class ExerciseDiaryEntryComponent {
    entry = input<DiaryEntry | null>();
    onSave = output();

    private service = inject(DiaryService);

    // STATE
    editMode = signal(true);
    loading = signal(false);
    noteOnly = signal(false);

    exercises = signal<Exercise[]>([]);
    notes = signal('');
    selectedId = signal<string | null>(null);

    entries = signal<DiaryEntry[]>([]);

    // DERIVED
    isEditingExisting = computed(() => !!this.selectedId());


    // EFFECT
    private entryEffec = effect(() => {
        const entry = this.entry();

        if (!entry) {
            return;
        }

        const { exercises, notes, id } = entry;
        this.exercises.set([...exercises]);
        this.notes.set(notes);

        if (id) {
            this.selectedId.set(id);
        }

        this.editMode.set(true);
    });

    addExercise() {
        this.exercises.update((list) => [...list, { name: '', value: 0, type: 'reps', series: 1 }]);
    }

    removeExercise(i: number) {
        this.exercises.update((list) => list.filter((_, idx) => idx !== i));
    }

    async save() {
        const entry = {
            userId: this.service.userId,
            date: new Date().toISOString(),
            exercises: this.exercises(),
            notes: this.notes(),
            type: this.noteOnly() ? 'diary' : 'exercises'
        };

        if (this.isEditingExisting()) {
            await this.service.update(this.selectedId()!, entry);
            this.editMode.set(false);
        } else {
            await this.service.create(entry);
        }

        this.onSave.emit();
    }

    edit(entry: any) {
        this.exercises.set([...entry.exercises]);
        this.notes.set(entry.notes);
        this.selectedId.set(entry.id);
        this.editMode.set(true);
    }

    reset() {
        this.editMode.set(false);
    }
}
