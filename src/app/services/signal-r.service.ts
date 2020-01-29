import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  public chatMessages: string[] = [];
  public connectionAmount: number = 0;
  private hubConnection: signalR.HubConnection

  public startConnection = () => {
    const isProductionEnvironment = environment.production;
    const serverBaseUrl = isProductionEnvironment ? 'https://tuomas-signalr-chat-server.azurewebsites.net' : 'https://localhost:5001';
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl(serverBaseUrl + '/chat')
                            .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public broadcastChatMessage = (message: string) => {
    console.log('lähetetään chat-viesti');
    console.log(message);
    //TODO: Vaihda event nimi
    this.hubConnection.invoke('broadcastchatmessage', message)
    .catch(err => console.error(err));
  }

  //TODO: Vaihda nimi
  public addBroadcastChatMessageListener = () => {
    console.log('vastaanotettiin data')
    this.hubConnection.on('broadcastchatmessage', (data) => {
      console.log('vastaanotettiin data')
      console.log(data)
      this.chatMessages.push(data);
    })
  }

  public addBroadcastConnectionAmountDataListener = () => {
    console.log('vastaanotettiin data')
    this.hubConnection.on('broadcastconnectionamountdata', (data) => {
      console.log('vastaanotettiin data')
      console.log(data)
      this.connectionAmount = data;
    })
  }
}
