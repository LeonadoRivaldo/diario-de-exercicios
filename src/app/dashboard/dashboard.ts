import { Component, effect, inject, OnInit, signal } from "@angular/core";
import { DiaryService } from "../core/services/diary/diary.service";
import { CommonModule } from "@angular/common";
import { ModalComponent } from "../core/components/modal/modal";
import { ExerciseDiaryEntryComponent } from "../core/components/exercise-diary-entry/exercise-diary-entry.component";
import { ActionCardComponent } from "../core/components/action-card/action-card";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { DiaryEntry } from "../core/models/exercise-diary.model";
import { AuthService } from "../core/services/auth/auth.service";
import { ExerciseDiaryHistoryComponent } from "../core/components/exercise-diary-history/exercise-diary-history";
import { NotificationService } from "../core/services/notification/notification";

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.html',
	imports: [ExerciseDiaryHistoryComponent],
	styleUrl: './dashboard.scss',
})
export class DashboardComponent{
}
