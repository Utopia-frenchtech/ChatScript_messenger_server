const builder = require('botbuilder');
const config = require('config');
const express = require('express');

const connector = new builder.ChatConnector({
    appId: config.get('ms.appId'),
    appPassword: config.get('ms.appPassword')
});
const bot = new builder.UniversalBot(connector);
const app = express();

// Middlewares
bot.use(builder.Middleware.sendTyping());

// Dialogs
const rootDialog = require('./dialogs/root');

bot.dialog('/', rootDialog);
// End

// Routes
app.post('/api/messages', connector.listen());

// Server
app.listen(config.get('server.port'), function () {
    console.log('App is running at port %s', config.get('server.port'));
});