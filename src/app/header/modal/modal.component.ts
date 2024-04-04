import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { ModalService } from './modal.service'; 
import { HeaderComponent } from '../header.component';


@Component({
    selector: 'jw-modal',
    templateUrl: 'modal.component.html',
    styleUrls: ['modal.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input() id?: string;
    isOpen = false;
    private element: any;

    constructor(private modalService: ModalService, private el: ElementRef, private headerComponent : HeaderComponent) {
        this.element = el.nativeElement;
    }

    
    ngOnInit() {
        this.modalService.add(this);
        document.body.appendChild(this.element);
        this.element.addEventListener('click', (el: any) => {
            if (el.target.className === 'jw-modal') {
                this.close();
            }
        });
    }

    ngOnDestroy() {
        // remove self from modal service
        this.modalService.remove();

        // remove modal element from html
        this.element.remove();        
    }

    open() {
        this.element.style.display = 'block';
        document.body.classList.add('jw-modal-open');
        this.isOpen = true;
    }

    close() {
        this.element.style.display = 'none';
        document.body.classList.remove('jw-modal-open');
        this.isOpen = false;
        this.headerComponent.resetSelection();
    }
}