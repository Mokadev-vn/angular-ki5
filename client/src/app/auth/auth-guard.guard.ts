import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const infoUser = JSON.parse(window.localStorage.getItem('dataUser') || '{}');

    if (!infoUser) {
      this.router.navigate(['login'])
      return false;
    }
    
    let result = this.auth.checkToken(infoUser.access_token).toPromise()
    return result.then((data) => {
      return true
    }).catch((err) => {
      this.router.navigate(['login'])
      return false;
    })

  }
}
