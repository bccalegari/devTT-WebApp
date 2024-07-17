import { DayPeriod } from '../domain/day-period.interface';

export class DayPeriodsFactory {
  public static getDayPeriods(): DayPeriod[] {
    return [
      { start: 0, end: 6, period: 'Boa madrugada' },
      { start: 6, end: 12, period: 'Bom dia' },
      { start: 12, end: 18, period: 'Boa tarde' },
      { start: 18, end: 24, period: 'Boa noite' },
    ];
  }
}
