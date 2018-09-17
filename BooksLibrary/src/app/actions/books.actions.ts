import { Book } from '../models/book.model';
import { Action } from '@ngrx/store'


// DEFINE ALL POSSIBLE DISPATCHES TO STORE.
export const SHOW_SEARCH            = '[BOOK] Search';
export const SHOW_SEARCH_SUCCESS    = '[BOOK] Search Success'
export const ADD_BOOK               = '[BOOK] Add';
export const REMOVE_BOOK            = '[BOOK] Remove';
export const EDIT_BOOK              = '[BOOK] Edit';


//DEFINE DATA THAT PASSED WITH EACH DISPATCHE.
export class ShowSearch implements Action {
    readonly type = SHOW_SEARCH;
    
    constructor(public payload: string) {}
}

export class ShowSearchSuccess implements Action {
    readonly type = SHOW_SEARCH_SUCCESS;

    constructor(public payload: Book[]){}
}

export class AddBook implements Action {
    readonly type = ADD_BOOK

    constructor(public payload: Book) {}
}

export class RemoveBook implements Action {
    readonly type = REMOVE_BOOK

    constructor(public payload: string) {}
}

export class EditBook implements Action {
    readonly type = EDIT_BOOK

    constructor(public payload: Book) {}
}

export type Actions = AddBook | RemoveBook | ShowSearch | ShowSearchSuccess | EditBook;