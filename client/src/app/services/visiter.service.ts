import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import {environment as env} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisiterService {
  private API_URL = env.API+'/visiter'
  constructor(private http: HttpClient) {
    
  }

  getAllCategory(): Observable<any>{
    return this.http.get<any[]>(this.API_URL+'/category')
  }

  getOneCategory(id: Number): Observable<any>{
    return this.http.get<any>(`${this.API_URL}/category/${id}`)
  }

  getAllComic(): Observable<any>{
    return this.http.get<any[]>(this.API_URL+'/comic')
  }

  getOneComic(id: Number): Observable<any>{
    return this.http.get<any>(`${this.API_URL}/comic/${id}`)
  }
}
