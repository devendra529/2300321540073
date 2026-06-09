// Notification.ts
// this is used to define the structure of the notification object that we will be receiving from the evaluation service.
export interface Notification {
  ID: string;
  Type: string;
  Message: string;
  Timestamp: string;
}