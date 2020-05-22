import mongoose from 'mongoose';

const { Schema } = mongoose;

const recurrentOperationsSchema = new Schema({
  label: { type: String },
  amount: { type: Number },
  day: { type: Number },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

const Model = mongoose.model('recurrentoperations', recurrentOperationsSchema);
export default Model;
