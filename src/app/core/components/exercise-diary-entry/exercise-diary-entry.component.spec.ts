import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseDiaryEntryComponent } from './exercise-diary-entry.component';

describe('ExerciseDiaryComponent', () => {
    let component: ExerciseDiaryEntryComponent;
    let fixture: ComponentFixture<ExerciseDiaryEntryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ExerciseDiaryEntryComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ExerciseDiaryEntryComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
