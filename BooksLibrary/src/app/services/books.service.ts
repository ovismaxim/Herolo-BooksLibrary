import { Book } from './../models/book.model';
import { Injectable } from '@angular/core';
import { HttpClient} from  '@angular/common/http';
import { map } from '../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  // BASE URL 
  private readonly url = "https://www.googleapis.com/books/v1/volumes?q=";

  constructor(private http:HttpClient) { }

  // HTTP REQUEST TO GOOGLE BOOK API CONVERT RESPONSE TO BOOK[] 
  getBooks(searchTerm:string){
    return this.http.get(`${this.url}${searchTerm}orderBy=newest`)
    .pipe(map( res => { return res['items']
          .map(element => {
            return {
            id: element.id,
            author: element.volumeInfo.hasOwnProperty('authors') ? element.volumeInfo.authors[0] : 'None',
            title: element.volumeInfo.title,
            imgUrl: element.volumeInfo.hasOwnProperty("imageLinks") ? element.volumeInfo.imageLinks.thumbnail : '', // CHECK IF PROPERTY IMG EXISTS
            date: new Date(element.volumeInfo.publishedDate)
            }
          })
        })
      );
  }
}