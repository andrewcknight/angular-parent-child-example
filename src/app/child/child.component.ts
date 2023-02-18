import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IBook} from "../parent/parent.component";

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent {
  @Input('book') book: IBook;
  @Output() closeDrawer = new EventEmitter<boolean>();
  @Output() addBook = new EventEmitter<IBook>();
  @Output() updateBook = new EventEmitter<IBook>();
  @Output() removeBook = new EventEmitter<IBook>();
}
