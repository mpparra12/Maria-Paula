import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../components/modal/modal.component';
 
@Injectable({
  providedIn: 'root'
})
export class ModalService {
 
  constructor(private modalService: NgbModal) { }
 
  open()
  {
    const modalref = this.modalService.open(ModalComponent,{ ariaLabelledBy:'modal-basic-title'});
    modalref.componentInstance.modalClass = 'bottom-modal';
    return modalref.result;
  }
 
 
}
 