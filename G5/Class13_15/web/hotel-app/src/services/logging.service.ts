import { Injectable } from '@angular/core';

interface TrackingError {
  section: string;
  timestamp: number;
  errorCode: number;
  errorMessage: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  constructor() {}

  trackError(error: TrackingError) {
    // Here it would be better not log it in console so the user can see it, but we can log it in our system.
    console.error(error);
  }
}
