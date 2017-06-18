import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoodReadsService } from '../goodreads.service';
import { BookService } from './book/book.service';
import { Book } from './book/book';
@Component({
  selector: 'book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {
  searchResult: any;
  searchQuery: string;
  errorMessage: any;
  
  private resultBooks: Book[] = [];
  constructor(private goodReadsService: GoodReadsService, private bookService: BookService, private route: ActivatedRoute, private zone: NgZone) {

  }

   ngOnInit() {
     this.route.queryParams.subscribe(params => {
       this.findBookOnGoodReads(params['query']);
     });
   }

  findBookOnGoodReads(ISBN: string) {
    console.log("searching for " + ISBN);
    this.resultBooks = [];
    this.errorMessage = null;
		this.goodReadsService.searchGoodReads(ISBN)
      .then(
        searchResult => {
          // console.log(searchResult);
          this.searchResult = searchResult;
          
          this.zone.run( () => {
            this.resultBooks = this.searchResult.map(function (book) {
              console.log(book);
              return new Book(book.title, book.author, book.isbn, book.isbn, book.description, book.url, book.avg_rating, book.num_pages, null, book.gr_url, null, null, null, null, null);
            });
          });
          
          },
        error => {
          this.errorMessage = <any> error;
          console.log(error);
          console.log("There was an error");
        }
      );
  }

  addToLibrary(book: Book):void {
    console.log("trying to save book");
    this.bookService.saveBook(book)
      .subscribe(
        result => {console.log(result);},
        error => console.log(error)
      );
  }

  /*extractData2():void {
    if (this.searchResult.length == 0) {
      this.errorMessage = "None Found";
    }
    for (var i = 0 ; i < this.searchResult.length; i++) {
      this.srimageURL = this.searchResult[i].best_book[0].image_url[0];
      this.srTitle = this.searchResult[i].best_book[0].title[0];
      this.srAuthor = this.searchResult[i].best_book[0].author[0].name[0];
      //console.log(this.srimageURL);
      this.avg_rating = this.searchResult[i].average_rating[0];

      let resBook = new Book(this.srTitle, this.srAuthor, null, null, null, this.srimageURL, this.avg_rating, null, null, null, null, null, null, null, null);
      //console.log(resBook.image_url);
      this.resultBooks.push(resBook);
    }
  }*/

}
