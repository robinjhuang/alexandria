import { Component, OnInit, NgZone } from '@angular/core';
import { FbloginService } from '../fblogin/fblogin.service';
@Component({
  selector: 'profile-navicon',
  templateUrl: './profile-navicon.component.html',
  styleUrls: ['./profile-navicon.component.css']
})
export class ProfileNaviconComponent implements OnInit {
  User: any;
  errorMessage: any;
  profilePictureURL: String = "";
  constructor(private fbloginService: FbloginService, private zone: NgZone) {

  }

  ngOnInit() {
    this.fbloginService.getUser()
      .subscribe(
          user => {
              this.zone.run( () => {
                this.User = user;
                this.profilePictureURL = this.User.profilePictureURL;
              });
              
          },
          error => this.errorMessage = <any> error
      );
  }

}
