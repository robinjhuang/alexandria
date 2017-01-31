import { Component, OnInit } from '@angular/core';
import { FbloginService } from '../fblogin/fblogin.service';
import { BookService } from '../book-search/book/book.service';
import { Book } from '../book-search/book/book';
import { BookComponent } from '../book-search/book/book.component';
@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile-header.component.css', './profile-library.component.css']
})

export class ProfileComponent implements OnInit {
    User: any;
    private UserPictureURL: String;
    private UserFirstName: String;
    private UserLastName: String;
    private Library: Book[];
    errorMessage: any;

    constructor(private fbloginService: FbloginService, private bookService: BookService) {
        this.UserPictureURL = "";
        this.UserFirstName = "";
        this.UserLastName = "";
        
    }

    ngOnInit () {
        console.log('here');
        this.fbloginService.getUser()
            .subscribe(
                user => {
                    this.User = user;
                    this.extractData();
                },
                error => this.errorMessage = <any> error
            );

        this.bookService.getLibrary()
            .subscribe(
                library => {
                    console.log(JSON.stringify(library));
                    this.Library = library;
                },
                error => this.errorMessage = <any> error
            );

        
    }

    extractData(): void {
        this.UserPictureURL = this.User.profilePictureURL;
        this.UserFirstName = this.User.first_name;
        this.UserLastName = this.User.last_name;
    }
}