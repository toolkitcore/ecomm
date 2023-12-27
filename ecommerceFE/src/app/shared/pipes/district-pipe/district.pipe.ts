import { Pipe, PipeTransform } from '@angular/core';
import { LOCATIONDATA } from 'src/app/core/data/location.data';

@Pipe({
  name: 'district'
})
export class DistrictPipe implements PipeTransform {

  transform(districtCode: string, ...args: any[]): string | undefined {
    const districts = LOCATIONDATA.flatMap((x) => x.districts);
    return districts.find((x) => x.code === districtCode)?.name;
  }
}
