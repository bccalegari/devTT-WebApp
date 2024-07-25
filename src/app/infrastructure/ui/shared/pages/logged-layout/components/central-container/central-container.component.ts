import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ChipModule } from 'primeng/chip';
import { FieldsetModule } from 'primeng/fieldset';

@Component({
  selector: 'app-central-container',
  standalone: true,
  imports: [
    FieldsetModule,
    ChipModule
  ],
  templateUrl: './central-container.component.html',
  styleUrl: './central-container.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CentralContainerComponent {
  @Input() public title!: string;
  @Input() public icon?: string;
}
