const { response } = require("express");
const User = require('../models/user');

const getUsers = async (req, res = response) => {
    const users = await User.find()
        .find({ _id: { $ne: req.uid } })
        .sort('-isOnline');

    res.json({
        ok: true,
        users
    });
};

module.exports = {
    getUsers
}