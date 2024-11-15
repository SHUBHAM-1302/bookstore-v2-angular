import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  private apiUrl = `http://localhost:3070/v1/md/book/`;

  getAllBooks(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getBookById(id: number): Observable<any> {
    const url = `http://localhost:3070/v1/md/book/${encodeURIComponent(id)}/`
    return this.http.get<any>(url);
  }

  updateBook(id: number, book: any) {
    const url = `http://localhost:3070/v1/md/book/${encodeURIComponent(id)}/`
    const patchHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json-patch+json',
      Accept: 'application/json',
    });
    const patchHttpOptions = {
      headers: patchHeaders,
    };
    return this.http.put<any>(url, book, patchHttpOptions)
  }
}
