import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'test'
})
export class TestPipe implements PipeTransform {

  transform(value: Number): string {
    switch(value) {
      case 1: return 'Nam'
      case 2: return 'Nữ'
      default: return 'Khác'
    }
  }

}
