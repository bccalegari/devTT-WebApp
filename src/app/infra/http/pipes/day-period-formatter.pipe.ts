import { Pipe, PipeTransform } from '@angular/core';
import { DayPeriod } from '../../../core/domain/day-period.valueobject';

@Pipe({
  name: 'dayPeriodFormatter',
  standalone: true,
})
export class DayPeriodFormatterPipe implements PipeTransform {
  public transform(value: Date): string {
    if (!value) {
      return '';
    }

    return this._getDayPeriodString(value);
  }

  private _getDayPeriodString(date: Date): string {
    const hours = date.getHours();
    const dayPeriods: DayPeriod[] = DayPeriod.getAvailableDayPeriods();
    return dayPeriods.find(period => hours >= period.start && hours < period.end)?.period || '';
  }
}
