import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CardModule],
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class KpiCardComponent {
  @Input() imageSrc!: string;
  @Input() title!: string;
  @Input() value!: number;
}
