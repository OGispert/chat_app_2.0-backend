const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateToken } = require('./jwt');

const createUser = async (req, res = response) => {

    const { username, password } = req.body;

    try {
        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.status(400).json({
                ok: false,
                msj: 'Email is not valid.'
            });
        }

        const user = User(req.body);

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        user.save();

        // Generate AWT
        const token = await generateToken(user.id);

        res.json({
            ok: true,
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: 'Contact support.'
        });
    }
}

const login = async (req, res = response) => {

    const { username, password } = req.body;

    try {
        // Validate user in db
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({
                ok: false,
                msj: 'User not found.'
            });
        }

        // Validate password
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msj: 'Password not valid.'
            });
        }

        // Generate JWT
        const token = await generateToken(user.id);

        res.json({
            ok: true,
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: 'Login error.'
        });
    }
}

const renewToken = async (req, res = response) => {

    const id = req.uid;

    // Generate AWT
    const token = await generateToken(id);

    const user = await User.findById(id);

    res.json({
        ok: true,
        user,
        token
    });
}

module.exports = {
    createUser,
    renewToken,
    login
}