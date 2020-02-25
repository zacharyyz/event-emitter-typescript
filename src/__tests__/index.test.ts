import Emitter from '../index';

describe('Emitter', () => {
  it('should be defined', () => {
    expect(Emitter).toBeDefined();
  });

  it('should emit and receive an event', () => {
    const emitter = new Emitter();

    let result;

    // Add event listener
    emitter.on('message', message => (result = message));

    // Add event emitter
    emitter.emit('message', 'Hello');

    // Check result
    expect(result).toBe('Hello');
  });
});
