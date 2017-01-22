/* Dependencies */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

/* Components */
import { AppComponent } from './app.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { FbloginComponent } from './fblogin/fblogin.component';
import { ProfileComponent } from './profile/profile.component';

/* Services */
import { FbloginService } from './fblogin/fblogin.service';
import { GoodReadsService } from './goodreads.service';
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
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [GoodReadsService, FbloginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
