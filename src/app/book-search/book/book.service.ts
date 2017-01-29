import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams, QueryEncoder, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable }     from 'rxjs/Observable';
import { Book } from './book';
@Injectable()
export class BookService {
    constructor(private http: Http) { }

    saveBook(book: Book): Observable<any> {
        let body = JSON.stringify(book);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options       = new RequestOptions({ headers: headers }); 
        console.log("saving book, making call to server");
        return this.http.post('/book/addBook', book , options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}