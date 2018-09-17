import { ShowSearch } from './../actions/books.actions';
import { BooksService } from './../services/books.service';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';
import * as  booksActions  from '../actions/books.actions';
import { map } from '../../../node_modules/rxjs/operators';
import { switchMap } from '../../../node_modules/rxjs/operators';

@Injectable()
export class BookEffects {

  constructor(private actions: Actions,private booksDB: BooksService) {}      

    // EFFECT THAT LISTENS FOR THE SEARCH ACTION DISPATCHED FROM STORE, 
    // PERFORMS HTTP REQUEST VIA BOOK SERVIES AND SEND NEW ACTION TO STORE.
     @Effect() 
     searchBooks: Observable<Action> = this.actions
         .ofType<booksActions.ShowSearch>(booksActions.SHOW_SEARCH)
         .pipe(map(action => action.payload),
         switchMap(searchTerm => 
            this.booksDB.getBooks(searchTerm)
            .pipe(map(res => {
                return new booksActions.ShowSearchSuccess(res)}
            )))
         ); 

}