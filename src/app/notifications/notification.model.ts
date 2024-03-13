export class Notification {
    public message: string;
    public duration: number;
    public type: 'success' | 'error';

    constructor(message: string, duration: number, type: 'success' | 'error') {
        this.message = message;
        this.duration = duration;
        this.type = type;
    }
  }
  