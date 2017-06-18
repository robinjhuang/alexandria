import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams, QueryEncoder } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class GoodReadsService {
  config : any = {params: null};
  constructor(private http: Http) { }

   getAllPosts() {
    return this.http.get('/api/posts')
      .map(res => res.json());
   }

  searchGoodReads(queryString: string): Promise<any> {
    let params = new URLSearchParams();
    params.set('searchQuery', queryString);
    return this.http.get('/goodReadsApi/searchBook', {search: params})
          .toPromise()
          .then(this.extractData2)
          .catch(this.handleError2);
  }

  private extractData2(res: Response) {
    let body = res.json();
    console.log("returned from server");
    //console.log(body);
    return body || { };
  }

  private handleError2 (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    console.log("got errror from server");
    let err = error._body;
    
    console.log(err);
    return Observable.throw(err);
  }

}
