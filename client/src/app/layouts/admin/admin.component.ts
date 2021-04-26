import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  searchText: string = "";
  constructor(private authService: AuthService, private router: Router, private sharedService: SharedServiceService) { }
  public isProfileMenuOpen: boolean = false;

  ngOnInit(): void {
  }

  clickProfile() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  async logout() {
    await this.authService.logout().toPromise()
    window.localStorage.clear()
    this.router.navigate(['/login'])
  }

  search(e: any) {
    this.sharedService.toggle(e.target.value)
  }

  activeComponent(){
    let search = document.querySelector('#search') as HTMLInputElement
    search.value = ""
  }

}
