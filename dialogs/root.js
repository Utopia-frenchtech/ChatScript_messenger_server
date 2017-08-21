const chatscript = require('../services/chatscript');

module.exports = function(session) {
    const userId = session.message.address.user.id;
    const text = session.message.text;
    const value = session.message.value;

    if (value && value === 'START') {
        chatscript.sendToServer(userId, ':reset', (err, response) => {
            if (err) {
                session.error(err);
                return;
            }

            session.send(response);
        });
    }
    else if (text) {
        chatscript.sendToServer(userId, text, (err, response) => {
            if (err) {
                session.error(err);
                return;
            }

            session.send(response);
        });
    }
};