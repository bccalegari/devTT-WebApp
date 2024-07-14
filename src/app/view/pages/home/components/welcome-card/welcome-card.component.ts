import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
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
  public dayPeriodString!: string;
  public actualDateString!: string;

  public ngOnInit(): void {
    this.actualDateString = this._getActualDateStringFormatted();
    this.dayPeriodString = this._getDayPeriodString();
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
    return `
      ${actualDate.toLocaleString('default', { day: '2-digit' })} de ${actualDate.toLocaleString('default', { month: 'long' })}
      de ${actualDate.getFullYear()} - ${actualDate.getHours()}:${actualDate.getMinutes()}
    `;
  }
}
