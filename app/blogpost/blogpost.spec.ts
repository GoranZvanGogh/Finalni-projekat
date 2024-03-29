import { Injectable } from '@angular/core';
import { Blogpost } from './blogpost';
import { HttpClient, HttpErrorResponse, HttpBackend } from '@angular/common/http'
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {

  ServerUrl = 'http://localhost/dev/blogger/';
  errorData: {};

  private http: HttpClient;

  constructor(handler: HttpBackend) {
      this.http = new HttpClient(handler);
  }

  getBlogs() {
    return this.http.get<Blogpost>(this.ServerUrl + 'api/blogs').pipe(
      catchError(this.handleError)
    );
  }

  getFeaturedBlogs() {
    return this.http.get<Blogpost>(this.ServerUrl + 'api/featured_blogs').pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.

      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.

      // The response body may contain clues as to what went wrong,

      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message

    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }
}