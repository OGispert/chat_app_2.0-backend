const { validateJWT } = require('../controllers/jwt');
const { io } = require('../index');

// Sockets
io.on('connection', client => {
    const [valid, uid] = validateJWT(client.handshake.headers['x-token']);

    if (!valid) {
        return client.disconnect();
    }

    console.log('Client connected');

    client.on('disconnect', () => {
        console.log('Client disconnected');
    });

});