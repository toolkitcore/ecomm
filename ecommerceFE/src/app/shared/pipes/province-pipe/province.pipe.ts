import { Pipe, PipeTransform } from '@angular/core';
import { LOCATIONDATA } from 'src/app/core/data/location.data';

@Pipe({
  name: 'province'
})
export class ProvincePipe implements PipeTransform {

  transform(code: string, ...args: any[]): string | undefined {
    return LOCATIONDATA.find((x) => x.code === code)?.name;
  }

}
