import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatter',
  standalone: true,
})
export class DateFormatterPipe implements PipeTransform {
  public transform(value: Date): string {
    if (!value) {
      return '';
    }

    return this._getFormattedDateString(value);
  }

  private _getFormattedDateString(date: Date): string {
    const formattedDate: Map<string, string> = this._getFormattedDateMap(date);
    return `
      ${formattedDate.get('day')} de ${formattedDate.get('month')} de ${formattedDate.get('year')}
      - ${formattedDate.get('hour')}:${formattedDate.get('minutes')}
    `;
  }

  private _getFormattedDateMap(date: Date): Map<string, string> {
    return new Map<string, string>([
      ['day', date.toLocaleString('default', { day: '2-digit' }).padStart(2, '0')],
      ['month', date.toLocaleString('default', { month: 'long' }).padStart(2, '0')],
      ['year', date.toLocaleString('default', { year: 'numeric' })],
      ['hour', date.toLocaleString('default', { hour: '2-digit' }).padStart(2, '0')],
      ['minutes', date.toLocaleString('default', { minute: '2-digit' }).padStart(2, '0')],
    ]);
  }
}
