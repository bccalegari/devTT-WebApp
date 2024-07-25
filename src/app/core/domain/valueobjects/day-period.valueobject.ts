export class DayPeriod {
  public readonly start!: number;
  public readonly end!: number;
  public readonly period!: string;

  public constructor(start: number, end: number, period: string) {
    this.start = start;
    this.end = end;
    this.period = period;
  }

  public static fromDawnPeriod(): DayPeriod {
    return new DayPeriod(0, 6, 'Boa madrugada');
  }

  public static fromMorningPeriod(): DayPeriod {
    return new DayPeriod(6, 12, 'Bom dia');
  }

  public static fromAfternoonPeriod(): DayPeriod {
    return new DayPeriod(12, 18, 'Boa tarde');
  }

  public static fromEveningPeriod(): DayPeriod {
    return new DayPeriod(18, 24, 'Boa noite');
  }

  public static getAvailableDayPeriods(): DayPeriod[] {
    return [
      DayPeriod.fromDawnPeriod(),
      DayPeriod.fromMorningPeriod(),
      DayPeriod.fromAfternoonPeriod(),
      DayPeriod.fromEveningPeriod(),
    ];
  }
}
