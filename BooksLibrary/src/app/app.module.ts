import { BooksService } from './services/books.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from  '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '../../node_modules/@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { BooklistComponent } from './home/booklist/booklist.component';
import { BookCardComponent } from './home/book-card/book-card.component';
import { MessageModelComponent } from './shared/message-model/message-model.component';


import { reducer } from './reducers/books.reducer';
import { BookFormComponent } from './home/book-form/book-form.component';
import { BookEffects } from './effects/book.effect';
import { RemoveNoneEngPipe } from './shared/remove-none-eng.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,  
    BooklistComponent,
    BookCardComponent,
    BookFormComponent,
    RemoveNoneEngPipe,
    MessageModelComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    StoreModule.forRoot({
      books: reducer
    }),
    FormsModule, 
    ReactiveFormsModule,
    EffectsModule.forRoot([BookEffects]),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    BooksService
  ],
  entryComponents : [
    BookFormComponent,
    MessageModelComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
