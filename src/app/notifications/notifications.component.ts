import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';
import { Notification } from './notification.model';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.less'
})
export class NotificationsComponent implements OnInit{
  notifications: Notification[];

  constructor(private notificationService: NotificationService){}

  ngOnInit() {
    this.notifications = this.notificationService.getNotifications();
  }

  removeNotification(index: number) {
    const notificationElement = document.getElementById(`notification-${index}`);
    if (notificationElement) {
      notificationElement.classList.add('fade-out');
      setTimeout(() => this.notificationService.removeNotification(index), 500); 
    }
  } 
}
