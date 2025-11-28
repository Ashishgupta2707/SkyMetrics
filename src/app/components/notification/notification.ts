import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification/notification-service';

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.scss',
})
export class Notification {
  
  notify : NotificationService = inject(NotificationService);

  clearNotify(){
    this.notify.clear();
  }
}
