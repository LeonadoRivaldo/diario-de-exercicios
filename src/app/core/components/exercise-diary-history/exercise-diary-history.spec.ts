import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseDiaryHistoryComponent } from './exercise-diary-history';

describe('ExerciseDiaryHistory', () => {
    let component: ExerciseDiaryHistoryComponent;
    let fixture: ComponentFixture<ExerciseDiaryHistoryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ExerciseDiaryHistoryComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ExerciseDiaryHistoryComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
