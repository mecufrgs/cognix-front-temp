import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


const endpoint = 'http://cognixBack:8080';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class RestService {

  constructor(private http: HttpClient) { }
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getID (): Observable<any> {
    return this.http.post<any>(endpoint + '/documents/new', "", httpOptions).pipe(
      tap(()=> console.log('getID')),
      catchError(this.handleError<any>('getID'))
    );
  }

  addDocument (product, id): Observable<any> {
    console.log("Lets begin");
    console.log(product);
    return this.http.post<any>(endpoint + '/documents/' + id, product, httpOptions).pipe(
      tap((product) => console.log("addProduct")),
      catchError(this.handleError<any>('addProduct'))
    );
  }


  getDocument (): Observable<any> {
    console.log("Lets begin");
    return this.http.get(endpoint + '/documents/' , httpOptions).pipe(
      tap((product) => console.log("getDocument")),
      catchError(this.handleError<any>('getDocument'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getDocumentFromID (id): Observable<any> {
    return this.http.get(endpoint + '/documents/' + id , httpOptions).pipe(
      tap((product) => console.log("getDocument")),
      catchError(this.handleError<any>('getDocument'))
    );
  }


  
}
