import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const recurrentOperationsSchema = new Schema({
  label: { type: String },
  amount: { type: Number },
  day: { type: Number },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
}, {
  usePushEach: true,
});

const Model = mongoose.model('recurrentoperations', recurrentOperationsSchema);
export default Model;
