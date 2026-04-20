import { Component, input, output } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import FONT_AWESOME_IMPORTS from '../../imports/fontawesome.imports';

type CardVariants = "primary" | "secondary" | "info" | "danger" | "success" | "warning" | "dark";

@Component({
	selector: 'app-action-card',
	imports: [...FONT_AWESOME_IMPORTS],
	templateUrl: './action-card.html',
	styleUrl: './action-card.scss',
})
export class ActionCardComponent {

	title = input("Action");
	subtitle = input();
	icon = input(faPlay);
	variant = input<CardVariants>();

	onClick = output()

}
