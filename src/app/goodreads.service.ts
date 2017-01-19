import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams, QueryEncoder } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class GoodReadsService {
  config : any = {params: null};
  constructor(private http: Http) { }

   getAllPosts() {
    return this.http.get('/api/posts')
      .map(res => res.json());
  }

  searchGoodReads(ISBN: string): Observable<any> {
    //console.log("The entered ISBN is: " + ISBN);
    let params = new URLSearchParams();
    params.set('searchQuery', ISBN);
    return this.http.get('/goodReadsApi/searchBook', {search: params})
          .map(this.extractData)
          .catch(this.handleError);
			
	}

  private extractData(res: Response) {
    let body = res.json();
    //console.log(body);
    return body.GoodreadsResponse || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
