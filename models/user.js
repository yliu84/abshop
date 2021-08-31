import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
      maxLength: [50, 'Your name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      validate: [validator.isEmail, 'Please enter valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      minLength: [6, 'Your password must be longer than 6 characters'],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
