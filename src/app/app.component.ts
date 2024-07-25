import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NotificationServiceImpl } from './core/application/services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, ToastModule],
  providers: [MessageService, NotificationServiceImpl],
})
export class AppComponent {
  title = 'devTT-WebApp';
}
