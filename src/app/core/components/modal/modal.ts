import {
	Component,
	input,
	effect,
	TemplateRef,
	contentChild,
	inject,
	signal,
	WritableSignal,
	output,
	viewChild,
} from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap/modal';

@Component({
	selector: 'app-modal',
	imports: [],
	templateUrl: './modal.html',
	styleUrl: './modal.scss',
})
export class ModalComponent {
	//INPUTS
	modalTitle = input('Warning');
	modalOptions = input<NgbModalOptions>();
	openModal = input(false);
	showFooter = input(false);

	//OUTPUTS
	modalClosed = output<any>();

	//VARS
	closeResult = signal('');

	modalContent = viewChild.required<TemplateRef<any>>('modalContent');

	private modalService = inject(NgbModal);
	private openModalEffect = effect(() => {
		const open = this.openModal();
		const content = this.modalContent();
		if (open) {
			this.open(content);
        } else {
            const hasOpenModals = this.modalService.hasOpenModals();
            if (hasOpenModals) {
                this.modalService.dismissAll();
            }
        }
	});

	open(content: TemplateRef<any>) {
		const customOptions = this.modalOptions() || {};
		const modalOptions: NgbModalOptions = { centered: true, ...customOptions};
		this.modalService.open(content, { ...modalOptions }).result.then(
			(result: any) => {
				this.closeResult.set(`Closed with: ${result}`);
				this.modalClosed.emit(this.closeResult());
			},
			(reason: any) => {
				this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
				this.modalClosed.emit(this.closeResult());
			},
		);
	}

	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}
}
