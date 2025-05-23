const User = require('../models/user');
const Message = require('../models/message');

const connectedUser = async (uid = '') => {
    const user = await User.findById(uid);
    user.isOnline = true;
    await user.save();
    return user;
};

const disconnectedUser = async (uid = '') => {
    const user = await User.findById(uid);
    user.isOnline = false;
    await user.save();
    return user;
};

const saveMessage = async (payload) => {
    try {
        const message = Message(payload);
        await message.save();
        return true;
    } catch (error) {
        return false;
    }
};

module.exports = {
    connectedUser,
    disconnectedUser,
    saveMessage
}