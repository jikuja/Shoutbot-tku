var ircClient = require('node-irc');


var client = new ircClient('irc.nebula.fi', 6667, 'ShoutbotTku', 'Boten Anna');

client.on('ready', function () {
  console.log('Connected to IRC!');
  client.join('#turunwappuradio-boten');
  client.say('#turunwappuradio-boten', 'Ready to rock?');

  startws(client);
});

console.log('Connecting to IRC...');
client.connect();


function startws(client) {
  const WebSocket = require('ws');
 
  const ws = new WebSocket('wss://music-metadata-server.herokuapp.com/');
 
  ws.on('open', function open() {
    console.log('websocket open');
  });
 
  ws.on('message', function incoming(data) {
    if (data !== 'PING') {
      console.log(data);
      client.say('turunwappuradio-boten', "np: " + data)
    } else {
      ws.send('PONG');
    }
  });
}
