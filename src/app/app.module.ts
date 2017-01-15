import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { GoodReadsService } from './goodreads.service';

// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full'
  },
  {
    path: 'posts',
    component: BookSearchComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BookSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule, 
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [GoodReadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
