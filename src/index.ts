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
  private handlers: Array<any> = [];

  constructor() {
    if (!(this instanceof Emitter)) {
      throw new TypeError("Emitter is not a function");
    }
  }

  /**
   * Add event listener.
   * @param {string} event type
   * @param {function} callback function
   */
  addEventListener = <T extends (...args: any) => any>(type: string, fn: T) => {
    this.handlers.push([type, fn]);
  };

  /**
   * Remove event listener.
   * @param {string} event type
   * @param {function} callback function
   */
  removeEventListener = <T extends (...args: any) => any>(
    type: string,
    fn: T | boolean = true
  ) => {
    this.handlers = this.handlers.filter(
      handler => !(handler[0] == type && (fn == true ? true : handler[1] == fn))
    );
  };

  /**
   * Dispatch event.
   * @param {string} event type
   * @param {any} event data
   */
  dispatchEvent = (type: string, data: any) => {
    this.handlers
      .filter(handler =>
        new RegExp("^" + handler[0].split("*").join(".*") + "$").test(type)
      )
      .forEach(handler => handler[1](data, type));
  };

  /**
   * Get list of event handlers (of a type) or all if type is not specified
   * @param {string} [event type] optional
   */
  getEventListeners = (type?: string) => {
    if (!type) {
      return this.handlers;
    }
    let fns: Array<Function> = [];
    this.handlers
      .filter(handler => handler[0] == type)
      .forEach(handler => fns.push(handler[1]));

    return fns;
  };

  /**
   * Clear event listeners
   * @param {string} [event type] (optional)
   */
  clearEventListeners = (type?: string) => {
    if (type) {
      this.handlers = this.handlers.filter(handler => !(handler[0] == type));
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
    return this;
  };

  /**
   *
   * @param {string} [type]
   */
  list = (type: string) => this.getEventListeners(type);
}

export default Emitter;
