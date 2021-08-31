import db from '../config/db';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import { signToken } from '../utils/auth';

const login = async (req, res) => {
  await db.connect();
  const user = await User.findOne({ email: req.body.email }).select(
    '+password'
  );
  await db.disconnect();

  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = signToken(user);
    res.status(200).json({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      avatar: user.avatar,
    });
  } else {
    res.status(401).json({ message: 'Invalid user or password' });
  }
};

const register = async (req, res) => {
  await db.connect();
  let avatar = {
    public_id: 'DEFAULT_AVATAR',
    url: 'https://res.cloudinary.com/datingappcloud/image/upload/v1629238099/bookit/avatars/default_avatar.jpg',
  };

  const { name, email, password } = req.body;

  const newUser = new User({
    name,
    email,
    password: bcrypt.hashSync(password),
    isAdmin: false,
    avatar,
  });

  const user = await newUser.save();
  await db.disconnect();

  const token = signToken(user);

  res.status(200).json({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
};

const updateProfile = async (req, res) => {
  await db.connect();
  const user = await User.findById(req.user._id).select('+password');
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password
    ? bcrypt.hashSync(req.body.password)
    : user.password;
  await user.save();
  await db.disconnect();

  const token = signToken(user);
  res.status(200).json({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
};

export { login, register, updateProfile };
