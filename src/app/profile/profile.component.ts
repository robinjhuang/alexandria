import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

    private address: any = {
        address: "",
        city: "",
        zip: ""
    }; 
    private submitted: Boolean;
    

    constructor(private fbloginService: FbloginService, private bookService: BookService) {
        this.UserPictureURL = "";
        this.UserFirstName = "";
        this.UserLastName = "";
        
    }

    onSubmit(form: any) {
        console.log("submitted");
        this.fbloginService.saveAddress(form)
            .subscribe(
                result => {console.log(result);},
                error => console.log(error)
            );
    }

    ngOnInit () {
        //console.log('here');
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
                    //console.log(JSON.stringify(library));
                    this.Library = library;
                },
                error => this.errorMessage = <any> error
            );

        
    }

    extractData(): void {
        //console.log(this.User);
        this.UserPictureURL = this.User.profilePictureURL;
        this.UserFirstName = this.User.first_name;
        this.UserLastName = this.User.last_name;
        if (!this.User.address_1)
            this.submitted = false; 
    }
}