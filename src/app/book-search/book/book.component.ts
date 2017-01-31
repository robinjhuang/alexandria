import { Component, Input} from '@angular/core';
import { BookService } from './book.service';
import { Book } from './book';
@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})

export class BookComponent {
    @Input()
    book: Book;
}