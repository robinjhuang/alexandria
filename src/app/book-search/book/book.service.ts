import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, Response, URLSearchParams, QueryEncoder, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable }     from 'rxjs/Observable';
import { Book } from './book';
@Injectable()
export class BookService {
    constructor(private http: Http, private router: Router) { }

    saveBook(book: Book): Observable<any> {
        let body = JSON.stringify(book);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options       = new RequestOptions({ headers: headers }); 
        console.log("saving book, making call to server");
        return this.http.post('/book/addBook', book , options)
            .map((res: Response) => {
                console.log(res.json());
                this.router.navigate(['/profile']);
            }) 
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getLibrary(): Observable<Book[]> {
        return this.http.get('/book/getLibrary')
                .map(this.extractData)
                .catch(this.handleError);
    }

    extractData(res: Response): Book[] {
        let library: Book[];
        let body = res.json();
        //console.log("The body"); 
        // console.log(body);
        library = body.map((book) => {
            return new Book (book.title, book.author, book.isbn, book.isbn13, book.description, book.image_url, book.avg_rating, book.num_pages, book.publisher, book.gr_url, book.owner, book.checked_out, book.checked_out_date, book.due_date, book.price);
        });
        console.log(library);
        return library;

    }

    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } 
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}