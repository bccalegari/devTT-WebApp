import { Component, Input } from '@angular/core';
import { CentralContainerComponent } from './components/central-container/central-container.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-logged-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    CentralContainerComponent
  ],
  templateUrl: './logged-layout.component.html',
  styleUrl: './logged-layout.component.scss'
})
export class LoggedLayoutComponent {
  @Input() public role!: string;
  @Input() public title!: string;
  @Input() public icon?: string;
}
