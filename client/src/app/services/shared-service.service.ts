import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  constructor() {

  }
  private _toggle = new Subject();
  
  toggle$ = this._toggle.asObservable();
  toggle(text: any) {
    this._toggle.next(text);
  }
}
