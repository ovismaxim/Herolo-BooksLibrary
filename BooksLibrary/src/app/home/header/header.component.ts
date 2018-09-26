
import { Book } from './../../models/book.model';
import { BookFormComponent } from './../book-form/book-form.component';
import { Component, OnInit, Output ,EventEmitter, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
  
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() searched = new EventEmitter<string>(); // NOTIFY PARENT OF NEW SEARCH
  @Output() newBook = new EventEmitter<Book>();    // NOTIFY PARENT OF NEW BOOK

  
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  // OPEN MODEL FOR ADDING BOOK && NOTIFY PARENT COMPONENT WHEN DONE 
  addBook(){
    const modalRef = this.modalService.open(BookFormComponent);
    modalRef.componentInstance.title = 'Add Book'; 
    modalRef.result.then( (res) =>{
      if(res !== undefined && res !== 'Close click'){
      res.id = '_' + Math.random().toString(36).substr(2, 9); // GENERATOR FOR ID - EACH ID STARTS WITH '_' TO AVOID DUPLICATION WITH GOOGLE IDS -  THEY WITH OUT '_'
      this.newBook.emit(res);
    }}, 
    reason => { if( reason === ModalDismissReasons.BACKDROP_CLICK ){ return; }})
  }

  // NOTIFY THE PARENT OF A SEARCH REUEST
  search(searchTerm:string){
    this.searched.emit(searchTerm);
  }

}
