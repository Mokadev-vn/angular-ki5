import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public error: string = '';
  constructor(private authService: AuthService, private router: Router, private notify: NotifierService) { 
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })
    if(window.localStorage.getItem('dataUser')){
      this.router.navigate(['admin'])
    }
  }

  ngOnInit(): void {

  }

  async login(){
    try{
      let result = await this.authService.login(this.loginForm.value).toPromise()
      window.localStorage.setItem('dataUser', JSON.stringify(result));
      this.router.navigate(['admin']);

    }catch(e){
      const error = e.error;
      if(error.email){
        this.loginForm.controls['email'].setErrors({'server': error.email[0]});
      }

      if(error.password){
        this.loginForm.controls['password'].setErrors({'server': error.password[0]});
      }

      if(error.error){
        this.notify.notify('error', 'The account you entered is not correct, please check again!');
      }
    }
  }

  get form() {
    return this.loginForm.controls;
  }
}
