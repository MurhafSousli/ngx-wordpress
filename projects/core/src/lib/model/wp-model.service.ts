import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WpModelService {

  constructor(private http: HttpClient) {
  }

  /**
   * Get a single object by id
   */
  get(url: string, id: number | string): Observable<any> {
    return this.http.get(url + '/' + id);
  }

  /**
   * Create a single object by id
   */
  create(url: string, body: any): Observable<any> {
    return this.http.post(url, body);
  }

  /**
   * Update an existing object by id
   */
  update(url: string, id: number | string, body?): Observable<any> {
    return this.http.put(url + '/' + id, body);
  }

  /**
   * Delete an existing object by id
   */
  delete(url: string, id: number | string): Observable<any> {
    return this.http.delete(url + '/' + id + '?force=true').pipe(
      map((res: { deleted: boolean, previous: any }) => res.previous)
    );
  }
}
