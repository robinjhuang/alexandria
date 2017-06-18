import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FbloginService } from '../fblogin/fblogin.service';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  isLoggedIn : Boolean = false;

  constructor(private fbloginService: FbloginService, private router: Router) {

  }

  ngOnInit() {
    this.fbloginService.isLoggedIn()
      .subscribe(loginStatus => {
        this.isLoggedIn = loginStatus;
      });
  }

  search(form: any) {
    console.log(form);
    this.router.navigate(['/search'], {queryParams: {query: form.searchQ}});
  }
}