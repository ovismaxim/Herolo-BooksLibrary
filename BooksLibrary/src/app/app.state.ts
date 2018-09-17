import { Book } from './models/book.model';


// DEFINETION OF HOW THE STATE IN THE CLIENT-SIDE APP LOOKS.
export interface AppState {
	  bookState: BookState;
}

export interface BookState {
	books: Book[];
	message: any;
} 