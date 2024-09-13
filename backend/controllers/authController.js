import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {jwtConfig} from '../config/jwtConfig.js';
const {jwtSecret} = jwtConfig;

export const register = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg: 'User Email already exists'});
        }

        user = new User ({
            name,
            email,
            password,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            jwtSecret,
            { expiresIn: '1h'},
            (err, token) => {
                if(err) throw err;

                // set the token in a cookie
                res.cookie('token', token, {
                    httpOnly: true, // prevents client-side js from accessing the cookie
                    secure: true, // ensures the cookie is sent only over https
                    maxAge: 3600000 // 1 hr
                });

                res.json({ success: true});
            }
        );
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({msg: 'Invalid Credentials'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({msg: 'Invalid Credentials'});
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            jwtSecret,
            { expiresIn: '1h'},
            (err, token) => {
                if(err) throw err;
                // set the token in a cookie
                res.cookie('token', token, {
                    httpOnly: true, // prevents client-side js from accessing the cookie
                    secure: true, // ensures the cookie is sent only over https
                    maxAge: 3600000 // 1 hr
                });

                res.json({success: true});
            }
        );
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

export const logout = (req, res) => {
    res.clearCookie('token'); // clears the token cookie
    res.json({success: true});
};

export const refreshToken = (req, res) => {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({msg: 'No token, authorization denied'});
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        const payload = {
            user: {
                id: decoded.user.id,
            },
        };

        jwt.sign(
            payload,
            jwtSecret,
            { expiresIn: '1h'},
            (err, newToken) => {
                if(err) throw err;
                // set the token in a cookie
                res.cookie('token', newToken, {
                    httpOnly: true, // prevents client-side js from accessing the cookie
                    secure: true, // ensures the cookie is sent only over https
                    maxAge: 3600000 // 1 hr
                });

                res.json({success: true});
            }
        );
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
}