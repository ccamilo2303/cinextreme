import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hour'
})
export class HourPipe implements PipeTransform {

  transform(value: number): string {
    if(value > 0 && value/60 < 1) {
      return value.toFixed(1) + ' m';

    } else {
      let horas : number = parseInt((value/60).toFixed(0));
      let minutos : number = (horas * 60) - value;
      return horas + ' h '+minutos+' m';
    }
 }

}
