import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: Number): String {
    switch(value) {
      case 1: return 'Đã Hoàn Thành'
      case 2: return 'Chưa Hoàn Thành'
      default: return ''
    }
  }

}
