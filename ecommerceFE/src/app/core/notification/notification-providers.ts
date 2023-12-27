import { NotificationQuery } from './notification.query';
import { NotificationService } from './notification.service';
import { NotificationStore } from './notification.store';
export const notificationProviders = [
  NotificationQuery,
  NotificationService,
  NotificationStore,
];