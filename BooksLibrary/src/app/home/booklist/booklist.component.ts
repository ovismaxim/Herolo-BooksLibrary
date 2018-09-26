import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from './../../app.state';
import * as bookActions from '../../actions/books.actions';
import { Book } from './../../models/book.model';
import { BooksService } from './../../services/books.service';
import { ToastrService } from 'ngx-toastr';


//////  THIS COMPONENT MANAGE THE APP STORE.
//////  THE ONLY COMPONENT THAT HAVE ACCESS TO THE RXJS STORE.
//////  PERFORM LOAD BOOKS, REMOVE, ADD, EDIT.   
//////  GET NOTIFY OF EDIT, REMOVE FROM BOOK_CARD COMPONENT && GET INPUT FROM HOME COMPONENT.

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.scss']
})
export class BooklistComponent implements OnChanges,OnInit {
  
  @Input() searchfor :  string;
  @Input() newBook   :  Book;

  appStore; 
  load = false; // FLAG TO AVOID ACCESS APPSTORE WHEN NOT DEFINE.

  constructor(private store: Store<AppState>,private bookDB:BooksService,private toastr: ToastrService) { }


  uniqueTitle(title: string){
    return this.appStore['books'].find(book => book.title === title) === undefined ? true : false;
  }

  // ADD BOOK TO APP STORE
  addBook(book: Book){
    if(this.uniqueTitle(book.title)){
      this.store.dispatch(new bookActions.AddBook(book));
      setTimeout(() => this.toastr.success(`${book.title} was add successfully`,'Book Was Added!'));
    }else{
      setTimeout(() => this.toastr.error(`The tilte ${book.title} is in use alrady`,'Error!'));
    }
  }

  // EDIT BOOK TO APP STORE
  editBook(data: any){
    let book = data[0];
    let titleChanged = data[1];
    if(titleChanged === false){
      this.store.dispatch(new bookActions.EditBook(book));
      setTimeout(() => this.toastr.success(`${book.title} was edited successfully`,'Book Was Edited!'));
    }else if (this.uniqueTitle(book.title)){
      this.store.dispatch(new bookActions.EditBook(book));
      setTimeout(() => this.toastr.success(`${book.title} was edited successfully`,'Book Was Edited!'));
    }else{
      setTimeout(() => this.toastr.error(`The tilte ${book.title} is in use alrady`,'Error!'));
    }
  }

  // REMOVE BOOK TO APP STORE
  removeBook(book: string){
    this.store.dispatch(new bookActions.RemoveBook(book));
    setTimeout(() => this.toastr.success(`Book number - ${book} was add successfully`, 'Book Was Deleted!',));
  }

  // UPADTE APP STORE WITH RESULTS FOR SEARCH TERM
  updateList(search: string){
    let searchTerm = search.replace(/ /g,"%20");
    
    this.store.dispatch(new bookActions.ShowSearch(searchTerm));
    this.store.select('books').subscribe( res =>{
      this.appStore = res;
      this.load = true;
    })
  }
  
  // LOAD DEFAULT LIST
  ngOnInit() {
    this.store.dispatch(new bookActions.ShowSearch('angular'));
    this.store.select('books').subscribe( res =>{
      this.appStore = res;
      this.load = true;
    })
  }

  // LISTENING FOR NEW VALUES OF INPUTS.
  ngOnChanges(changes: SimpleChanges){

    if(changes['searchfor'] !== undefined){
      if(changes.searchfor.currentValue !== undefined){
        this.updateList(changes.searchfor.currentValue);
      }
    }

    if(changes['newBook'] !== undefined){
      if(changes.newBook.previousValue !== changes.newBook.currentValue){
        this.addBook(changes.newBook.currentValue);
      }
    }
  }
}
