Node WebSocket Demo
===================

Enabels communication between two web pages.

## Connecting as Broadcaster
```js
var ws = new WebSocket('ws://localhost:8080');

ws.onopen = function(evt) {
  this.send( JSON.stringify({"type":"init","data":"primary"}) );
};
```
## Connecting as listener
```js
var ws = new WebSocket('ws://localhost:8080');

ws.onopen = function(evt) {
  this.send( JSON.stringify({"type":"init","data":"secondary"}) );
};
```
