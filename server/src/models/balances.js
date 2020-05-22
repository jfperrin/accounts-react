import mongoose from 'mongoose';

const { Schema } = mongoose;

const BalancesSchema = new Schema({
  amount: {
    type: Number,
    default: 0,
  },
  bank: {
    type: Schema.Types.ObjectId,
    ref: 'banks',
  },
  period: {
    type: Schema.Types.ObjectId,
    ref: 'periods',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

const Model = mongoose.model('balances', BalancesSchema);
export default Model;
