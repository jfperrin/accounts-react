import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const operationsSchema = new Schema({
  label: { type: String },
  dt: { type: Date },
  pointedAt: { type: Date },
  amount: { type: Number },
  isRecurrent: { type: Boolean },
  period: {
    type: Schema.Types.ObjectId,
    ref: 'periods',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
}, {
  usePushEach: true,
});

const Model = mongoose.model('operations', operationsSchema);
export default Model;
