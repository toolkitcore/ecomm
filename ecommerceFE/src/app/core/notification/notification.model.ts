export interface Notification {
  eventName: string;
  groupName: string;
  userId: string;
  seen: boolean;
  metaData: any;
  id: string;
}

export interface NumberNewNotification {
  numberNotification: number;
}