import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  formObject = {
    username: '',
    password: '',
  }

  gender = 2

  constructor() { }

  ngOnInit(): void {
  }

  updateUsername(e: any){
    this.formObject.username = e.target.value
  }

}
