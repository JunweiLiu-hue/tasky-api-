import express from 'express';
import bcrypt from 'bcrypt'; 
import User from './userModel';

const router = express.Router();

const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
};

router.get('/', async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ code: 400, msg: 'Invalid request body' });
        }

        const { username, password } = req.body;

        if (req.query.action === 'register') {
            if (!validatePassword(password)) {
                return res.status(400).json({
                    code: 400,
                    msg: 'Password must be at least 8 characters long, include one letter, one number, and one special character.',
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({ username, password: hashedPassword });
            await newUser.save();
            res.status(201).json({
                code: 201,
                msg: 'Successfully created new user.',
            });
        } else if (req.query.action === 'authenticate') {
            const user = await User.findOne({ username });

            if (!user) {
                return res.status(401).json({ code: 401, msg: 'Authentication failed: User not found' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ code: 401, msg: 'Authentication failed: Invalid password' });
            }

            res.status(200).json({ code: 200, msg: "Authentication Successful", token: 'TEMPORARY_TOKEN' });
        } else {
            res.status(400).json({ code: 400, msg: 'Invalid action' });
        }
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        if (req.body._id) delete req.body._id;

        if (req.body.password) {
            if (!validatePassword(req.body.password)) {
                return res.status(400).json({
                    code: 400,
                    msg: 'Password must be at least 8 characters long, include one letter, one number, and one special character.',
                });
            }
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        const result = await User.updateOne({
            _id: req.params.id,
        }, req.body);

        if (result.matchedCount) {
            res.status(200).json({ code: 200, msg: 'User Updated Successfully' });
        } else {
            res.status(404).json({ code: 404, msg: 'Unable to Update User' });
        }
    } catch (err) {
        next(err);
    }
});

export default router;
