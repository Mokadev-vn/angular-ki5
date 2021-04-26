import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) { }
  login(data: any): Observable<any>{
    return this.http.post(env.API+'/auth/login', data);
  }

  logout(): Observable<any>{
    return this.http.post(env.API+'/auth/logout',null);
  }
  
  checkToken(data: string): Observable<any>{
    return this.http.post(env.API+'/auth/infoUser', null, {
        headers: {
          'Authorization': 'Bearer '+data
        }
      });
  }
}
   