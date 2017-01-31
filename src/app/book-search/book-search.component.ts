import { Component, OnInit } from '@angular/core';
import { GoodReadsService } from '../goodreads.service';
import { BookService } from './book/book.service';
import { Book } from './book/book';
@Component({
  selector: 'book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent {
  searchResult: any;
  searchQuery: string;
  errorMessage: any;

  // Field Data
  private srTitle: string;
  private srAuthor: string;
  private srDescription: string;
  private srimageURL: string;

  private isbn: string;
  private isbn13: string;
  private avg_rating: number;
  private num_pages: number;
  private publisher: string;
  private gr_url: string;
  
  private resultBook: Book;

  constructor(private goodReadsService: GoodReadsService, private bookService: BookService) {
    this.srimageURL = "";
   }

  findBookOnGoodReads(ISBN: string) {
		this.goodReadsService.searchGoodReads(ISBN)
      .subscribe(
        searchResult => {
          this.searchResult = searchResult;
          console.log(searchResult);
          console.log("Successful");
          this.extractData();
          },
        error => {
          this.errorMessage = <any> error;
          this.resultBook = null;
          console.log(error);
          console.log("There was an error");
        }
      );
  }

  addToLibrary():void {
    console.log("trying to save book");
    this.bookService.saveBook(this.resultBook)
      .subscribe(
        result => {console.log(result);},
        error => console.log(error)
      );
  }

  extractData():void {
    this.srimageURL = this.searchResult.book[0].image_url[0];
    this.srTitle = this.searchResult.book[0].title[0];
    this.srAuthor = this.searchResult.book[0].authors[0].author[0].name[0];
    this.srDescription = this.searchResult.book[0].description[0];

    this.isbn = this.searchResult.book[0].isbn[0];
    this.isbn13 = this.searchResult.book[0].isbn13[0];
    this.avg_rating = this.searchResult.book[0].average_rating[0];
    this.num_pages = Number.parseInt(this.searchResult.book[0].num_pages[0]);
    this.publisher = this.searchResult.book[0].publisher[0];
    this.gr_url = this.searchResult.book[0].url[0];
    
    this.resultBook = new Book (this.srTitle, this.srAuthor, this.isbn, this.isbn13, this.srDescription, this.srimageURL, this.avg_rating, this.num_pages, this.publisher, this.gr_url, null, false, new Date(), null, 5);
  }

}
