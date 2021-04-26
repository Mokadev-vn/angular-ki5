import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Category } from '../models/Category';
import {environment as env} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private API_URL = env.API+'/author'
  constructor(private http: HttpClient) { }
  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.API_URL)
  }

  add(data: any): Observable<any>{
    return this.http.post<any>(this.API_URL, data);
  }

  getOne(id: Number): Observable<any>{
    return this.http.get<any>(`${this.API_URL}/${id}`)
  }

  edit(id: Number, data: any): Observable<any>{
    return this.http.put<any>(`${this.API_URL}/${id}`, data)
  }

  delete(id: Number): Observable<any>{
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }

  search(data: Object): Observable<any>{
    return this.http.post<any>(`${env.API}/search`, data)
  }
}
