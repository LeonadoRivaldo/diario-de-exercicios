import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseDiaryComponent } from './exercise-diary.component';

describe('ExerciseDiaryComponent', () => {
    let component: ExerciseDiaryComponent;
    let fixture: ComponentFixture<ExerciseDiaryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ExerciseDiaryComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ExerciseDiaryComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
