import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unitFormat',
  standalone: true,
  
})
export class UnitFormatPipe implements PipeTransform {
  transform(unit: string): string {
    const mappings: { [key: string]: string } = {
      'ac': 'kg', 
      'un': 'Unidade',
      'l': 'Litro',
      'ton': 'Tonelada'
    };
    return mappings[unit] || unit;
  }
}