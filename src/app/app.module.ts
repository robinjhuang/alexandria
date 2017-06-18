/* Dependencies */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

/* Components */
import { AppComponent } from './app.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { FbloginComponent } from './fblogin/fblogin.component';
import { ProfileComponent } from './profile/profile.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { BookComponent } from './book-search/book/book.component';
import { ProfileNaviconComponent } from './profile-navicon/profile-navicon.component';
/* Services */
import { FbloginService } from './fblogin/fblogin.service';
import { GoodReadsService } from './goodreads.service';
import { BookService } from './book-search/book/book.service';
import { AuthGuard } from './authGuard/auth-guard';
// Define the routes
const ROUTES = [
  {
    path: 'search',
    component: BookSearchComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'posts',
    component: BookSearchComponent
  },
  {
    path: '*',
    component: BookSearchComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BookSearchComponent,
    FbloginComponent,
    ProfileComponent,
    BookComponent,
    MainNavComponent,
    ProfileNaviconComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule, 
    RouterModule.forRoot(ROUTES),
    MaterialModule.forRoot()
  ],
  providers: [GoodReadsService, FbloginService, BookService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
