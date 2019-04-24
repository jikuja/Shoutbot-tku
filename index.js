var ircClient = require('node-irc');

const channel = '#turunwappuradio'
var client = new ircClient('irc.nebula.fi', 6667, 'ShoutbotTku', 'In case of emergency ban bot and ping IoP');

client.on('ready', function () {
  console.log('Connected to IRC!');
  client.join(channel);

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
      client.say(channel, "np: " + data)
    } else {
      ws.send('PONG');
    }
  });
}
