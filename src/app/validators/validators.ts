import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";

export function checkNameCate(service: any): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors> => {
    return service.checkNameCate(control.value).pipe(map(data => {
      return data ? null : {'exxxx': true}
    }
    ))
  }
}