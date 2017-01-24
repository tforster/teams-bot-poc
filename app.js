'use strict'

const restify = require('restify');
const builder = require('botbuilder');
const quotes = require('./data.json');

let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
  console.log('%s listening to %s', server.name, server.url);
});

let connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
});

let bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

bot.dialog('/', function (session) {
  let quote = quotes[parseInt(Math.random() * (quotes.length - 1))];
  session.send(quote);
});
