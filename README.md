# Event Emitter

> Simple event emitter and listener with TypeScript

## Usage

Create a new emitter object

```javascript
import Emitter from 'event-emitter-ts';

const emitter = new Emitter();

emitter.on('message', msg => console.log(msg));

emitter.emit('message', 'Hello World');
```
