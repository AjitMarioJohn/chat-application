import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatMessage } from '../../../models/chat-message';
import { WebSocketService } from '../../../services/websocket.service';
import { Subscription } from 'rxjs';
import { LoggerService } from '../../../shared/logger/logger.service';

@Component({
  selector: 'app-chat',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  private subscription: Subscription | undefined;
  messages: ChatMessage[] = [];
  message = '';

    constructor(private webSocketService: WebSocketService, private logger: LoggerService) {
    }

    ngOnInit(): void {
      this.subscription = this.webSocketService.getMessages().subscribe({
        next: (event) => {
          if (event instanceof Object) {
            this.logger.log('Received WebSocket event:', event);
            this.handleMessage(event);
          } else {
            this.logger.error('Invalid WebSocket event received:', event);
          }
        },
        error: (err) => this.logger.error('WebSocket error:', err),
        complete: () => this.logger.log('WebSocket connection closed')
      });
    }
  
    sendMessage(): void {
      const message : ChatMessage = { sender: 'User', content: this.message, timestamp: new Date() }; // Send structured JSON
      this.webSocketService.sendMessage(message);
      this.message = '';
    }
  
    ngOnDestroy(): void {
      this.subscription?.unsubscribe();
    }

    handleMessage(response: any): void {
      const { sender, content, timestamp } = response;
  
      // Format the timestamp
      const formattedTimestamp = this.formatTimestamp(timestamp);
  
      console.log('formattedTimestamp :', formattedTimestamp);
      // Add the message to the messages array
      this.messages.push({
        sender,
        content,
        timestamp: formattedTimestamp
      });
    }
  

    formatTimestamp(timestamp: number[]): Date {
      const [year, month, day, hours, minutes, seconds, nanoseconds] = timestamp;
  
      // Convert nanoseconds to milliseconds
      const milliseconds = Math.floor(nanoseconds / 1000000);
  
      // Create a Date object
      const date = new Date(year, month - 1, day, hours, minutes, seconds, milliseconds);
  
      // Format the date
      return date; // Default format (e.g., "30/03/2025, 08:26:26")
    }
}
