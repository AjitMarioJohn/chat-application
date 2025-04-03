import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  log(message: any, ...optionalParams: any[]) {
    if (environment.enableDebug) {
      console.log(message, ...optionalParams);
    }
  }

  warn(message: any, ...optionalParams: any[]) {
    if (environment.enableDebug) {
      console.warn(message, ...optionalParams);
    }
  }

  error(message: any, ...optionalParams: any[]) {
    if (environment.enableDebug) {
      console.error(message, ...optionalParams);
    }
  }
}