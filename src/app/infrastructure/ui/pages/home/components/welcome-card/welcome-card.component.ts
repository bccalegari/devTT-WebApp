import { Component, Input, OnInit, ViewEncapsulation, WritableSignal, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DateFormatterPipe } from '../../../../../http/pipes/date-formatter.pipe';
import { DayPeriodFormatterPipe } from '../../../../../http/pipes/day-period-formatter.pipe';

@Component({
  selector: 'app-welcome-card',
  standalone: true,
  imports: [CardModule, DayPeriodFormatterPipe, DateFormatterPipe],
  templateUrl: './welcome-card.component.html',
  styleUrl: './welcome-card.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class WelcomeCardComponent implements OnInit {
  @Input() userName!: string;
  public actualDate: WritableSignal<Date> = signal<Date>(new Date());
  private readonly _dateRefreshInterval: number = 60000; // 60 seconds

  public ngOnInit(): void {
    setInterval(() => this._updateDate(), this._dateRefreshInterval);
  }

  private _updateDate(): void {
    this.actualDate.set(new Date());
  }
}
