var ircClient = require('node-irc');

const channel = process.env.CHANNEL || false;
const nick = process.env.NICK || false;
const server = process.env.SERVER || 'irc.nebula.fi';
const port = process.env.PORT || 6667;
const realName = process.env.REALNAME || 'bot';

if (!channel || !nick) {
  console.log('Missing required environment variables');
  process.exit(1);
}

var client = new ircClient(server, port, nick, realName);

client.on('ready', function () {
  client.join(channel);
  startws(client);
});

//client.verbosity = 3;
//client.debug = true;
client.connect();


function startws(client) {
  const WebSocket = require('ws');
 
  const ws = new WebSocket('wss://music-metadata-server.herokuapp.com/');
 
  ws.on('open', function open() {
    console.log('websocket open');
  });

  ws.on('message', function incoming(data) {
    if (data === 'PING') {
      ws.send('PONG');
      return;
    }

    if (data.startsWith('Turun Wappuradio -')) {
      console.log('jinkku: ' + data);
    } else {
      console.log('biisi: ' + data);
      client.notice(channel, 'Nyt soi: ' + data)
    }
  });
}
