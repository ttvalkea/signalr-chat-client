import { Component, OnInit } from '@angular/core';
import { SignalRService } from './services/signal-r.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public chatMessage: string = '';

  constructor(public signalRService: SignalRService, private http: HttpClient) { }

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addBroadcastChatMessageListener();
    this.signalRService.addBroadcastConnectionAmountDataListener();
    this.startHttpRequest();
  }

  private startHttpRequest = () => {
    const isProductionEnvironment = environment.production;
    const serverBaseUrl = isProductionEnvironment ? 'https://tuomas-signalr-chat-server.azurewebsites.net/api' : 'https://localhost:5001/api';
    this.http.get(serverBaseUrl + '/chat')
      .subscribe(res => {
        console.log(res);
      })
  }

  //TODO: Parametriksi message, this pois
  public sendMessage = () => {
    this.signalRService.broadcastChatMessage(this.chatMessage);
  }
}
