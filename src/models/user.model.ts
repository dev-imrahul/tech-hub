import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name field required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password field required'],
    minLength: [8, 'Password must be 8 characters'],
    select: false
  },
  user_name: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "User name field required"]
  },
  mobile_no: {
    type: Number,
    trim: true,
  },
  country_code: {
    type: Number
  },
  profile_picture: {
    data: Buffer,
    content_type: String
  },
  address: {
    location: String,
    city: String,
    zip_code: Number,
    country: String
  }
});

userSchema.pre('save', async function(nextFn) {
  if(!this.isModified()) return nextFn();

  this.password = await bcrypt.hash(this.password, 10);
  nextFn();
})

export const User = mongoose.model('users', userSchema);
