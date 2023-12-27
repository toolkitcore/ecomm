import { NotificationService } from './../notification/notification.service';
import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { environment } from 'src/environments/environment';
import { AuthenticationQuery } from '../authentication/authentication.query';
import { SocketEvent } from '../const/socket-event';

@Injectable()
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  private isConnected = false;
  constructor(
    private readonly authenticationQuery: AuthenticationQuery,
    private readonly notificationService: NotificationService
  ) { }

  startConnection(): void {
    if (this.isConnected) {
      return;
    }
    const jwtToken = this.authenticationQuery.getValue().accessToken;
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/notification-hub`, {
        accessTokenFactory: () => jwtToken
      })
      .build();
    this.hubConnection
      .start()
      .then(() => {
        this.isConnected = true;
        console.log('Connection started');
      })
      .then(
        () => {
          this.listenNotification();
        }
      )
      .catch(err => {
        this.isConnected = false;
        console.error('Error while starting connection: ' + err);
      });
  }

  private listenNotification(): void {
    this.hubConnection.on(SocketEvent.newNotification,
      data => {
        this.notificationService.receiveNewNotification(data);
      });
  }

  disconnectConnection(): void {
    if (this.hubConnection) {
      this.isConnected = false;
      this.hubConnection.stop();
    }
  }
}
