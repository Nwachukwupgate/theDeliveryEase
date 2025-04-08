import Pusher from 'pusher-js';

import { LocationUpdate } from '@/types/types';

export class WebSocketService {
  private pusher: Pusher;
  private channel: any;
  private deliveryId: number | null = null;
  private locationUpdateCallback: ((update: LocationUpdate) => void) | null = null;

  constructor() {
    // Initialize Pusher with your credentials
    this.pusher = new Pusher(import.meta.env.VITE_APP_PUSHER_KEY as string, {
      cluster: import.meta.env.VITE_APP_PUSHER_CLUSTER as string,
      forceTLS: true
    });
  }

  subscribeToDelivery(deliveryId: number, callback: (update: LocationUpdate) => void): void {
    // Unsubscribe from previous channel if exists
    if (this.channel) {
      this.pusher.unsubscribe(`delivery.${this.deliveryId}`);
    }
    
    this.deliveryId = deliveryId;
    this.locationUpdateCallback = callback;
    
    // Subscribe to the new channel
    this.channel = this.pusher.subscribe(`delivery.${deliveryId}`);
    
    // Listen for location updates
    this.channel.bind('location.updated', (data: LocationUpdate) => {
      if (this.locationUpdateCallback) {
        this.locationUpdateCallback(data);
      }
    });
  }

  unsubscribe(): void {
    if (this.deliveryId) {
      this.pusher.unsubscribe(`delivery.${this.deliveryId}`);
      this.deliveryId = null;
      this.locationUpdateCallback = null;
    }
  }
}

export const websocketService = new WebSocketService();