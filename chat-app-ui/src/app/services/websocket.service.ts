import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { ChatMessage } from '../models/chat-message';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket$: WebSocketSubject<ChatMessage>;

  constructor() {
    this.socket$ = webSocket('ws://localhost:8080/chat');
  }

  sendMessage(message: ChatMessage): void {
    this.socket$.next(message); // Ensure the message is properly formatted
  }

  getMessages(): Observable<ChatMessage> {
    return this.socket$.asObservable();
  }
}