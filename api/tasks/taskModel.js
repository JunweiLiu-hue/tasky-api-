import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// 创建任务架构
const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  deadline: { 
    type: Date,
    validate: {
      validator: (date) => date > new Date(),  
      message: 'Deadline must be in the future.'
    }
  },
  done: { type: Boolean },
  priority: { 
    type: String, 
    enum: ["Low", "Medium", "High"], 
    required: true 
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },

  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true 
  }
});

export default mongoose.model('Task', TaskSchema);
