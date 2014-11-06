Node WebSocket Demo
===================

Enabels communication between two web pages.

## Running the server

Just install the dependencies and run app.js: 
```
npm install
node app.js
```

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
