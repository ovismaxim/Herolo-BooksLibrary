
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  @Input() title; // FORM TITLE
  @Input() bookData; // BOOK DATA IF EDIT MODE

  bookForm: FormGroup;
  bookTitle: FormControl;
  bookDate: FormControl;
  bookAuthor: FormControl;

  // CREATE INSTANCE OF NGBACTIVEMODEL TO CONTROL OPEN MODEL. 
  constructor(public activeModal: NgbActiveModal) { }

  // CREATE FORM CONTROLS WITH VALIDATORS
  createFormControls(){
    this.bookTitle = new FormControl("", Validators.required,);
    this.bookDate =  new FormControl("", Validators.required);
    this.bookAuthor =  new FormControl("", Validators.required);
  }

  // CREATE FORM GROUP FORM FROM CONTROLS THAT CREATED.
  createForm(){
    this.bookForm = new FormGroup({
      booktitle : this.bookTitle,
      bookdate: this.bookDate,
      bookauthor: this.bookAuthor
    })
  }

  // ON EDIT INJECT THE BOOK DATA TO INPUT PLACEHOLDERS && VALUES
  injectBookData(){
    if(this.bookData){
      this.bookTitle.setValue(this.bookData.title);
      this.bookDate.setValue(this.bookData.date.toISOString().split('T')[0]);
      this.bookAuthor.setValue(this.bookData.author);
    }
  }

  // CREATE FORM AND INJECT BOOK DATA IF NEEDED
  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.injectBookData()
  }

  //CLOSE MODEL AND SEND TO PARENT THE NEW BOOK OBJECT
  saveBook(){
    if(this.bookData){
      this.activeModal.close({
        id: this.bookData.id,
        title: this.bookTitle.value,
        author: this.bookAuthor.value,
        date: new Date(this.bookDate.value),
        imgUrl: this.bookData.imgUrl
      })  
    }else{
      this.activeModal.close({
        title: this.bookTitle.value,
        author: this.bookAuthor.value,
        date: new Date(this.bookDate.value),
        imgUrl: false
      });
    }
  }
}
