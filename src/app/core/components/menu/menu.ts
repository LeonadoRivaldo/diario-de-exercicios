import { Component, signal } from '@angular/core';
import SHARED_IMPORTS from '../../imports/shared.imports';
import { RouterLink } from '@angular/router';

interface MenuItem{
	link: string;
	label: string;
}


const MENU: MenuItem[] = [
	{
		link: "dashboard",
		label: "Dashboard"
	},
];

@Component({
	selector: 'app-menu',
	imports: [SHARED_IMPORTS, RouterLink],
	templateUrl: './menu.html',
	styleUrl: './menu.scss',
})
export class MenuComponent{
	menu = signal<MenuItem[]>(MENU)
}
