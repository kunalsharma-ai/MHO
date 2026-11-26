import EventEmitter from 'events';

class EventStream extends EventEmitter {
  constructor() {
    if (EventStream.instance) {
      return EventStream.instance;
    }

    super();
    this.setMaxListeners(50);
    this.on('error', (err) => {
      console.error('[EventStream Error]:', err);
    });

    EventStream.instance = this;
  }
  emitEvent(event, payload) {
    try {
      this.emit(event, payload);
    } catch (err) {
      this.emit('error', err);
    }
  }
  onEvent(event, listener) {
    this.on(event, async (payload) => {
      try {
        await listener(payload);
      } catch (err) {
        this.emit('error', err);
      }
    });
  }
  onceEvent(event, listener) {
    this.once(event, listener);
  }
}
const eventStream = new EventStream();
export default eventStream;