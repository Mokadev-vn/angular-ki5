import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import {environment as env} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommicsService {

  private API_URL = env.API+'/comic'
  constructor(private http: HttpClient) { }
  getAll(params: any = {}): Observable<any> {
    return this.http.get<any>(this.API_URL, {params})
  }

  add(data: any): Observable<any>{
    return this.http.post<any>(this.API_URL, data);
  }

  getOne(id: Number): Observable<any>{
    return this.http.get<any>(`${this.API_URL}/${id}`)
  }

  edit(id: Number, data: any): Observable<any>{
    return this.http.post<any>(`${this.API_URL}/${id}?_method=PUT`, data)
  }

  delete(id: Number): Observable<any>{
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }
  search(data: Object): Observable<any>{
    return this.http.post<any>(`${env.API}/search`, data)
  }
}
