import { BookState } from './../app.state'; 
import * as BooksActions from '../actions/books.actions'
import { ToastrService } from 'ngx-toastr';

const initialState: BookState = { books : [], message: ''};

// REDUSER - DEFINE HOW TO HANDLE DEFFIRENT ACTIONS IN SIDE THE STORE.
// GET CURRENT STATE AND ACTION AND CREATE NEW STATE.

export function reducer(state = initialState, action: BooksActions.Actions) {

    switch(action.type) {

        case BooksActions.SHOW_SEARCH_SUCCESS:
            return { books : action.payload , message: 'Success' };

        case BooksActions.ADD_BOOK:      
            return { books:[  action.payload, ...state.books], message:'Success' };

        case BooksActions.REMOVE_BOOK: 
            return { books: state.books.filter(book => book.id !== action.payload), message:'Success' };

        case BooksActions.EDIT_BOOK:
            return { books: state.books.map(book => book.id === action.payload.id ? action.payload : book ), message: 'Success'};

        default:     
            return state;
    }
}
