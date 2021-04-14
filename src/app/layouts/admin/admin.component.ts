import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  public isProfileMenuOpen: boolean = false;
  ngOnInit(): void {
  }

  clickProfile(){
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  async logout(){
    await this.authService.logout().toPromise()
    window.localStorage.clear()
    this.router.navigate(['/login'])
  }
  
}
