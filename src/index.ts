type Fns = (...args: any) => any;

interface Event {
  type: string;
  function: Fns;
}

/**
 * @constructor
 * @this Emitter
 */
class Emitter {
  /**
   * Store event handles here.
   * @type {Array}
   * @private
   */
  private handlers: Event[] = [];

  constructor() {
    if (!(this instanceof Emitter)) {
      throw new TypeError('Emitter is not a function');
    }
  }

  /**
   * Add event listener.
   * @param {string} event type
   * @param {function} callback function
   */
  addEventListener = <T extends (...args: any) => any>(type: string, fn: T) => {
    const event = {
      type,
      function: fn,
    };
    this.handlers.push(event);
  };

  /**
   * Remove event listener.
   * @param {string} event type
   * @param {function} callback function
   */
  removeEventListener = <T extends (...args: any) => any>(type: string, fn: T | boolean = true) => {
    this.handlers = this.handlers.filter(
      handler => !(handler.type === type && (fn === true ? true : handler.function === fn)),
    );
  };

  /**
   * Dispatch event.
   * @param {string} event type
   * @param {any} event data
   */
  dispatchEvent = (type: string, data: any) => {
    this.handlers
      .filter(handler => new RegExp(`^${handler.type.split('*').join('.*')}$`).test(type))
      .forEach(handler => handler.function(data, type));
  };

  /**
   * Get list of event handlers (of a type) or all if type is not specified
   * @param {string} [event type] optional
   */
  getEventListeners = (type?: string) => {
    if (!type) {
      return this.handlers;
    }
    const fns: Fns[] = [];
    this.handlers.filter(handler => handler.type === type).forEach(handler => fns.push(handler.function));

    return fns;
  };

  /**
   * Clear event listeners
   * @param {string} [event type] (optional)
   */
  clearEventListeners = (type?: string) => {
    if (type) {
      this.handlers = this.handlers.filter(handler => handler.type !== type);
    } else {
      this.handlers = [];
    }
  };

  /**
   * Short cut for addEventListener.
   * @param {string} event type
   * @param {function} callback function
   */
  on = <T extends (...args: any) => any>(type: string, fn: T) => {
    this.addEventListener(type, fn);
    return this; /* chain */
  };

  /**
   * Shortcut for removeEventListener
   * @param {string} event type
   * @param {function} callback function
   */
  off = <T extends (...args: any) => any>(type: string, fn: T) => {
    this.removeEventListener(type, fn);
    return this; /* chain */
  };

  /**
   * Shortcut for dispatchEvent
   * @param {string} event type
   * @param {any} event data
   */
  emit = (type: string, data: any) => {
    this.dispatchEvent(type, data);
    return this; /* chain */
  };

  /**
   * Shortcut for clearEventListeners
   * @param {string} event type
   */
  clear = (type: string) => {
    this.clearEventListeners(type);
    return this; /* chain */
  };

  /**
   * Shortcut for getEventListeners
   * @param {string} [type]
   */
  list = (type: string) => this.getEventListeners(type);
}

export default Emitter;
