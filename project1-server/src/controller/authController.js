const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Users = require('../model/Users');
const { OAuth2Client } = require('google-auth-library');
const { validationResult } = require('express-validator');

// JWT secret key from environment
const secret = process.env.JWT_SECRET;

const authController = {
    login: async (request, response) => {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(401).json({ errors: errors.array() });
            }

            const { username, password } = request.body;

            const user = await Users.findOne({ email: username });
            if (!user) {
                return response.status(401).json({ message: 'Invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return response.status(401).json({ message: 'Invalid credentials' });
            }

            const userPayload = {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role || 'admin',
                adminId: user.adminId
            };

            const token = jwt.sign(userPayload, secret, { expiresIn: '1h' });

            response.cookie('jwtToken', token, {
                httpOnly: true,
                secure: false, // localhost works on HTTP, not HTTPS
                sameSite: 'lax', // safer default for CSRF
                path: '/'
            });

            response.json({ user: userPayload, message: 'User authenticated' });
        } catch (error) {
            console.log(error);
            response.status(500).json({ error: 'Internal server error' });
        }
    },

    logout: (request, response) => {
        response.clearCookie('jwtToken', { path: '/' });
        response.json({ message: 'Logout successful' });
    },

    isUserLoggedIn: (request, response) => {
        const token = request.cookies.jwtToken;

        if (!token) {
            return response.status(401).json({ message: 'Unauthorized access' });
        }

        jwt.verify(token, secret, (error, user) => {
            if (error) {
                return response.status(401).json({ message: 'Unauthorized access' });
            } else {
                response.json({ message: 'User is logged in', user: user });
            }
        });
    },

    register: async (request, response) => {
        try {
            const { username, password, name, role } = request.body;

            const existingUser = await Users.findOne({ email: username });
            if (existingUser) {
                return response.status(401).json({ message: 'Account already exists with given email' });
            }

            const encryptedPassword = await bcrypt.hash(password, 10);

            const user = new Users({
                email: username,
                password: encryptedPassword,
                name: name,
                role: role || 'admin'
            });

            await user.save();

            const userDetails = {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            };

            const token = jwt.sign(userDetails, secret, { expiresIn: '1h' });

            response.cookie('jwtToken', token, {
                httpOnly: true,
                secure: false, // For localhost HTTP
                sameSite: 'lax',
                path: '/'
            });

            response.json({ message: 'User registered', user: userDetails });
        } catch (error) {
            console.log(error);
            response.status(500).json({ error: 'Internal server error' });
        }
    },

    googleAuth: async (request, response) => {
        try {
            const { idToken } = request.body;
            if (!idToken) {
                return response.status(401).json({ message: 'Invalid request' });
            }

            const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
            const googleResponse = await googleClient.verifyIdToken({
                idToken: idToken,
                audience: process.env.GOOGLE_CLIENT_ID
            });

            const payload = googleResponse.getPayload();
            const { sub: googleId, name, email } = payload;

            let user = await Users.findOne({ email: email });
            if (!user) {
                user = new Users({
                    email: email,
                    name: name,
                    isGoogleUser: true,
                    googleId: googleId,
                    role: 'admin'
                });
                await user.save();
            }

            const userPayload = {
                id: user._id || googleId,
                username: email,
                name: name,
                role: user.role || 'admin'
            };

            const token = jwt.sign(userPayload, secret, { expiresIn: '1h' });

            response.cookie('jwtToken', token, {
                httpOnly: true,
                secure: false, // localhost
                sameSite: 'lax',
                path: '/'
            });

            response.json({ user: userPayload, message: 'User authenticated' });
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = authController;
