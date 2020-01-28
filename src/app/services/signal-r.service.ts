import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
// import { ChartModel } from '../_interfaces/ChartModel'

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  //TODO: poista nämä 2
  // public data: ChartModel[];
  public broadcastedData: string;

  public chatMessages: string[] = [];

private hubConnection: signalR.HubConnection

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('https://tuomas-signalr-chat-server.azurewebsites.net/chart') //'https://localhost:5001/chart' <- TODO: API environment conf
                            .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  // public addTransferChartDataListener = () => {
  //   this.hubConnection.on('transferchartdata', (data) => {
  //     console.log('saatiin dataa')
  //     this.data = data;
  //     console.log(data);
  //   });
  // }

  //TODO: poista
  public broadcastChartData = () => {
    console.log('lähetetään juhuu ja klon aika')
    this.hubConnection.invoke('broadcastchartdata', 'juhuu' + new Date())
    .catch(err => console.error(err));
  }

  public broadcastChatMessage = (message: string) => {
    console.log('lähetetään chat-viesti');
    console.log(message);
    //TODO: Vaihda event nimi
    this.hubConnection.invoke('broadcastchartdata', message)
    .catch(err => console.error(err));
  }

  //TODO: Vaihda nimi
  public addBroadcastChartDataListener = () => {
    console.log('vastaanotettiin data')
    this.hubConnection.on('broadcastchartdata', (data) => {
      console.log('vastaanotettiin data')
      console.log(data)
      this.chatMessages.push(data);
    })
  }
}
