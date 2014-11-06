var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({port:8080});

var secondaryClients = [];

var ClientConnection = function( ws ) {
  this.primary = false;
  this.ws = ws;

  var client = this;

  var msgHandler = function( data ) {
    var data = JSON.parse(data);

    if ( data.type === "init" ) {
      if ( data.data === "primary" ) {
        client.primary = true;
        client.initialized = true;
        ws.send(JSON.stringify({msg: "Initilized as primary"}));
      } else if ( data.data === "secondary" ) {
        client.primary = false;
        client.initialized = true;
        secondaryClients.push(ws);
        ws.send(JSON.stringify({msg: "Initilized as secondary"}));
      }
    }

    if ( client.initialized && client.primary && data.type === "secondary" ) {
      for(var i in secondaryClients) {
        secondaryClients[i].send(JSON.stringify(data.data));
      }
    }
  };

  var closeHandler = function( data ) {
    // cleanup
    if ( !client.primary ) {
      secondaryClients.splice( secondaryClients.indexOf( client.ws ), 1 );
    }
  };
  
  ws.on('message', msgHandler);
  ws.on('close', closeHandler);
};

wss.on( 'connection', function( ws ) {

  var client = new ClientConnection(ws);

  ws.send(JSON.stringify({msg: "Connected"}));
});