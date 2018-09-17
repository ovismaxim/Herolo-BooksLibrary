
import { Book } from './../../models/book.model';
import { BookFormComponent } from './../book-form/book-form.component';
import { Component, OnInit, Output ,EventEmitter, ViewChild } from '@angular/core';
import { NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, merge } from '../../../../node_modules/rxjs/operators';
import { Subject, Observable } from '../../../../node_modules/rxjs';


const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

  
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
      res.id = '_' + Math.random().toString(36).substr(2, 9); // GENERATOR FOR ID - EACH ID STARTS WITH '_' TO AVOID DUPLICATION WITH GOOGLE IDS -  THEY WITH OUT '_'
      this.newBook.emit(res);
    })
  }

  // NOTIFY THE PARENT OF A SEARCH REUEST
  search(searchTerm:string){
    this.searched.emit(searchTerm);
  }

}
