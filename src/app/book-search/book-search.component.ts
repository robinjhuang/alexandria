import { Component, OnInit } from '@angular/core';
import { GoodReadsService } from '../goodreads.service';

@Component({
  selector: 'book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent {
  searchResult: any;
  private searchResultString: String;
  searchQuery: String;
  errorMessage: any;

  // Field Data
  private srTitle: String;
  private srAuthor: String;
  private srDescription: String;
  private srimageURL: String;

  constructor(private goodReadsService: GoodReadsService) {
    this.srimageURL = "";
   }

  findBookOnGoodReads(ISBN: string) {
		this.goodReadsService.searchGoodReads(ISBN)
      .subscribe(
        searchResult => {
          this.searchResult = searchResult;
          console.log(searchResult);
          this.extractData();
          },
        error => this.errorMessage = <any> error
      );
    
  }

  extractData():void {
    this.srimageURL = this.searchResult.book[0].image_url[0];
    this.srTitle = this.searchResult.book[0].title[0];
    this.srAuthor = this.searchResult.book[0].authors[0].author[0].name[0];
    this.srDescription = this.searchResult.book[0].description[0];
    
  }

}
