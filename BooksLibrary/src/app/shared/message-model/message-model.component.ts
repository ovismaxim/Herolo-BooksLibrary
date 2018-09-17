import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message-model',
  templateUrl: './message-model.component.html',
  styleUrls: ['./message-model.component.scss']
})
export class MessageModelComponent implements OnInit {

  @Input() title :        string;  // MODEL TITLE
  @Input() message :      string;  // MODEL MESSAGE
  @Input() QuestionType : boolean; // MODEL TYPE MESSAGE OR QUESTION.

  // CREATE INSTANCE OF NGBACTIVEMODEL TO CONTROL OPEN MODEL. 
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
