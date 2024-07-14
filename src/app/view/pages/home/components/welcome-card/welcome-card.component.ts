import { Component, Input, OnInit, ViewEncapsulation, WritableSignal, signal } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-welcome-card',
  standalone: true,
  imports: [CardModule],
  templateUrl: './welcome-card.component.html',
  styleUrl: './welcome-card.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class WelcomeCardComponent implements OnInit {
  @Input() userName!: string;
  public dayPeriodString: WritableSignal<string> = signal<string>('');
  public actualDateString: WritableSignal<string> = signal<string>('');
  private readonly _dayPeriodRefreshInterval: number = 5 * 3600000 + (3600000 / 2); // 5 hours and 30 minutes
  private readonly _actualDateStringRefreshInterval: number = 30000; // 30 seconds

  public ngOnInit(): void {
    this._updateDayPeriod();
    this._updateActualDate();
    setInterval(() => this._updateDayPeriod(), this._dayPeriodRefreshInterval);
    setInterval(() => this._updateActualDate(), this._actualDateStringRefreshInterval);
  }

  private _updateDayPeriod(): void {
    this.dayPeriodString.set(this._getDayPeriodString());
  }

  private _updateActualDate(): void {
    this.actualDateString.set(this._getActualDateStringFormatted());
  }

  private _getDayPeriodString(): string {
    const actualDate: Date = new Date();
    const hours = actualDate.getHours();
    if (hours >= 6 && hours < 12) {
      return 'Bom dia';
    } else if (hours >= 12 && hours < 18) {
      return 'Boa tarde';
    } else if (hours >= 18 && hours < 24) {
      return 'Boa noite';
    } else {
      return 'Boa madrugada';
    }
  }

  private _getActualDateStringFormatted(): string {
    const actualDate: Date = new Date();
    const actualDateFormatted: Map<string, string> = this._getActualDateFormattedMap(actualDate);
    return `
      ${actualDateFormatted.get('day')} de ${actualDateFormatted.get('month')} de ${actualDateFormatted.get('year')}
      - ${actualDateFormatted.get('hour')}:${actualDateFormatted.get('minutes')}
    `;
  }

  private _getActualDateFormattedMap(actualDate: Date): Map<string, string> {
    return new Map<string, string>([
      ['day', actualDate.toLocaleString('default', { day: '2-digit' })],
      ['month', actualDate.toLocaleString('default', { month: 'long' })],
      ['year', actualDate.toLocaleString('default', { year: 'numeric' })],
      ['hour', actualDate.toLocaleString('default', { hour: '2-digit' })],
      ['minutes', actualDate.toLocaleString('default', { minute: '2-digit' })],
    ]);
  }
}
