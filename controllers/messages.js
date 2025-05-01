const { response } = require("express");
const Message = require('../models/message');

const getMessages = async (req, res = response) => {
    const myUID = req.uid;
    const messageFrom = req.params.from;

    const last100 = await Message.find({
        $or: [{ from: myUID, to: messageFrom }, { from: messageFrom, to: myUID }]
    }).sort({ createdAt: 'desc' }).limit(100);

    res.json({
        ok: true,
        messages: last100
    });
};

module.exports = {
    getMessages
}