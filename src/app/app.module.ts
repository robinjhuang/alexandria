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
/* Services */
import { FbloginService } from './fblogin/fblogin.service';
import { GoodReadsService } from './goodreads.service';
import { BookService } from './book-search/book/book.service';
// Define the routes
const ROUTES = [
  {
    path: '',
    component: FbloginComponent,
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'posts',
    component: BookSearchComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BookSearchComponent,
    FbloginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule, 
    RouterModule.forRoot(ROUTES),
    MaterialModule.forRoot()
  ],
  providers: [GoodReadsService, FbloginService, BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
