import { MessageModelComponent } from './../../shared/message-model/message-model.component';
import { Book } from './../../models/book.model';
import { BookFormComponent } from './../book-form/book-form.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {

  @Input() bookData;  // BOOK DATA
  @Output() bookRemove = new EventEmitter<string>(); // NOTIFY PARENT COMPONENT OF REMOVE ACTION - RETURN ID.
  @Output() bookEdit = new EventEmitter<Book>(); // NOTIFY PARENT COMPONENT OF EDIT ACTION - RETURN BOOK OBJ.

  image:SafeStyle; // OBJ TO SAVE IMG PATH IN ORDER ASSIGNED IN ON FLY 

  // CREATE INSTANCE OF DomSanitizer FOR IMG PATH && NGBMODEL TO OPEN AND CONTROL RETURN VALUES OF MODEL.
  constructor(private sanitization:DomSanitizer, private modalService: NgbModal) { }

  // IF THERE IS NO IMG FOR BOOK CREATE A GREEN/YELLOW BACKGROUND.
  injectImg(){
    if(this.bookData.imgUrl){
      this.image = this.sanitization.bypassSecurityTrustStyle(`url(${this.bookData.imgUrl})`);
    } else{
      this.image =this.sanitization.bypassSecurityTrustStyle('linear-gradient(to right bottom, green,yellow)');
    }
  }

  ngOnInit() {
    this.injectImg();
  }

  isDate(){
    return this.bookData.date === 'None' ?  false : true;
  }

  // NOTIFY PARENT COMPONENT ON REMOVE
  removeBook(){
    const modalRef = this.modalService.open(MessageModelComponent);
    modalRef.componentInstance.title = 'Delete Book';
    modalRef.componentInstance.message = 'Are you sure you want to delete this Book?'; 
    modalRef.componentInstance.QuestionType = true; 
    modalRef.result.then( (res) =>{
      if(res !== undefined){
        if(res === true)
          this.bookRemove.emit(this.bookData.id);
      }
    },
    reason => { if( reason === ModalDismissReasons.BACKDROP_CLICK ){ return; }})
  }

  // OPEN MODEL FOR EDIT && NOTIFY PARENT COMPONENT WHEN EDIT DONE 
  editBook(){
    const modalRef = this.modalService.open(BookFormComponent);
    modalRef.componentInstance.title = 'Edit Book'; 
    modalRef.componentInstance.bookData = this.bookData
    modalRef.result.then( (res) =>{
      if(res !== undefined)
        this.bookEdit.emit(res)
    }, 
    reason => { if( reason === ModalDismissReasons.BACKDROP_CLICK ){ return; }})
  }
}
