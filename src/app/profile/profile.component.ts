import { Component, OnInit, NgZone } from '@angular/core';
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
    private Library: Book[];
    errorMessage: any;
    private hasAddress: Boolean;
    private address: any = {
        address: "",
        city: "",
        zip: ""
    }; 
    
    
    constructor(private fbloginService: FbloginService, private bookService: BookService, private zone: NgZone) {
        
    }

    onSubmit(form: any) {
        console.log("submitted");
        this.fbloginService.saveAddress(form)
            .subscribe(
                (result) => {
                    this.zone.run( () => {
                        this.hasAddress = result;
                    });
                },
                error => console.log(error)
            );
    }

    ngOnInit () {
        this.fbloginService.getUser()
            .subscribe(
                user => {
                    this.extractData(user);
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

    extractData(user): void {
        this.zone.run(() =>{
            this.User = user;
            console.log(user);
            if (this.User.address_1){
                this.hasAddress = true;
            }
        });
    }
}