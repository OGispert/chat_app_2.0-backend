const User = require('../models/user');

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

module.exports = {
    connectedUser,
    disconnectedUser
}