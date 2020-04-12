import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema(
  {
    primaryUser: {
      type: Number,
      required: true,
    },
    secondaryUser: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Chat', ChatSchema);
