const { validateJWT } = require('../controllers/jwt');
const { io } = require('../index');
const { connectedUser, disconnectedUser, saveMessage } = require('../controllers/sockets')

// Sockets
io.on('connection', client => {
    const [valid, uid] = validateJWT(client.handshake.headers['x-token']);

    if (!valid) {
        return client.disconnect();
    }

    connectedUser(uid);
    console.log('Client connected');

    client.join(uid);

    client.on('private-message', async (payload) => {
        await saveMessage(payload);
        io.to(payload.to).emit('private-message', payload);
    });

    client.on('disconnect', () => {
        disconnectedUser(uid);
        console.log('Client disconnected');
    });

});