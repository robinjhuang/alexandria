import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams, QueryEncoder } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class FbloginService {
    private user: any;
    constructor(private http: Http) { }

    getUser(): Observable<any> {
        return this.http.get('/authenticate/getUser')
          .map(this.extractData)
          .catch(this.handleError);
    }

    isLoggedIn(): Observable<Boolean> {
        return this.http.get('/authenticate/isLoggedIn')
          .map((res) => res.json())
          .catch((err) => Observable.throw(err.statusText));
    }

    private extractData(res: Response) {
        let body = res.json();
        console.log("extracting data" + body);
        return body.user || { };
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