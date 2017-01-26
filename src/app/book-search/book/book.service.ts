import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams, QueryEncoder } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class BookService {
    constructor(private http: Http) { }

    saveBook(book: Book) {

    }
}