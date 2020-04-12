import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    sender: {
      type: Number,
      required: true,
    },
    recipient: {
      type: Number,
      required: true,
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Message', MessageSchema);
