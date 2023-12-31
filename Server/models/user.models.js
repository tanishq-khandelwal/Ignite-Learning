import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, 'Name is Required'],
    trim: true,
    minLength: [5, 'Minimum Length is 5 Characters'],
    maxLength: [50, 'Name cannot exceed 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is Required'],
    trim: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is Required'],
    minlength: [4, 'Password Should be a minimum of 4 Characters'],
    maxlength: [10, 'Password Cannot be greater than 10 Characters'],
    select: false,
  },
  
  avatar: {
    public_id: {
      type: String,
    },
    secure_url: {
      type: String,
    },
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER',
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
  subscription:{
    id:String,
    status:String
  }
}, {
  timestamps: true,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods = {
  generateJWTToken: async function () {
    return await jwt.sign(
      { id: this._id, email: this.email, subscription: this.subscription },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );
  },

  comparePassword: function (plainTextPassword) {
    const result = bcrypt.compareSync(plainTextPassword, this.password);
    console.log('Comparison Result (inside comparePassword):', result);
    return result;
  },

  generatePasswordResetToken: async function () {
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.forgotPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex'); // Fixed the typo here
    this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000; // 15 min from now

    return resetToken;
  },
};

const User = model('User', userSchema);

export default User;
