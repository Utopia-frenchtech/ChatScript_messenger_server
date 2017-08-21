const net = require('net');
const config = require('config');

module.exports.sendToServer = function(userId, text, cb) {
    const client = new net.Socket();

    client.connect(
        {
            port: config.get('cs.port'),
            host: config.get('cs.host'),
            allowHalfOpen: true
        },
        () => {
            const payload =
                userId + '\x00' +
                config.get('cs.bot') + '\x00' +
                text + '\x00'
            ;

            client.write(payload);
        }
    );

    client.on('error', function(err) {
        cb(err);
    });

    client.on('data', function(data) {
        let response = data.toString();

        const re = /(.*?)\s?\*{3}/i;

        if (re.test(response)) {
            const matches = response.match(re);
            response = matches[1];
        }

        cb(null, response);
    });
};