import { environment as env } from '../../environments/environment'
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private API_URL = env.API+'/category'
  constructor(private http: HttpClient) { }
  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.API_URL)
  }

  addNewCategory(data: any): Observable<any>{
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
}
