const EVENT_WILDCARD = '*';

class EventEmitter {
  constructor() {
    this.handlers = {};
  }

  onAnything(handler) {
    this.on(EVENT_WILDCARD, handler);
  }

  on(eventName, handler) {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = [];
    }

    this.handlers[eventName].push(handler);
  }

  off(eventName, handler) {
    if (!this.handlers[eventName]) return;

    const handlerIndex = this.handlers[eventName].indexOf(handler);

    if (handlerIndex >= 0) {
      this.handlers[eventName].splice(handlerIndex, 1);
    }
  }

  once(eventName, handler) {
    this.on(eventName, (...args) => {
      handler(...args);
      this.off(eventName, handler);
    });
  }

  emit(eventName, ...args) {
    let isCanceled = false;

    if (this.handlers[EVENT_WILDCARD]) {
      this.handlers[EVENT_WILDCARD].forEach((eventHandler) => {
        const returnValue = eventHandler(eventName, ...args);
        isCanceled = (returnValue !== undefined && !returnValue) || isCanceled;
      });
    }

    if (this.handlers[eventName]) {
      this.handlers[eventName].forEach((eventHandler) => {
        const returnValue = eventHandler(...args);
        isCanceled = (returnValue !== undefined && !returnValue) || isCanceled;
      });
    }

    return !isCanceled;
  }
}

module.exports = EventEmitter;
