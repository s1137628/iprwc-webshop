import { Notification } from "./notification.model";

export class NotificationService{
    notifications: Notification[] = [];

    constructor() {}

    getNotifications(){
        return this.notifications;
    }
 
    addNotification(notification: Notification) {
        this.notifications.push(notification);
        
        setTimeout(() => this.removeNotification(this.notifications.indexOf(notification)), notification.duration);
      }

    removeNotification(index: number){
        const notificationElement = document.getElementById(`notification-${index}`);
        notificationElement.classList.add('fade-out');
        setTimeout(() => this.notifications.shift(), 500); 
    }
}