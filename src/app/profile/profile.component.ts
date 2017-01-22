import { Component, OnInit } from '@angular/core';
import { FbloginService } from '../fblogin/fblogin.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
    User: any;
    private UserPictureURL: String;
    private UserFirstName: String;
    private UserLastName: String;
    errorMessage: any;

    constructor(private fbloginService: FbloginService) {
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
    }

    extractData(): void {
        this.UserPictureURL = this.User.profilePictureURL;
        this.UserFirstName = this.User.first_name;
        this.UserLastName = this.User.last_name;
    }
}