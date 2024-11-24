import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  accountName: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema); 