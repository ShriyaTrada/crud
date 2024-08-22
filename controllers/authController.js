const { registerSchema, loginSchema } = require('../validation/userValidation');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.register = async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { username, email, password, role } = req.body;
    const user = await User.create({ username, password: await bcrypt.hash(password, 10), role });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
