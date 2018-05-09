import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const banksSchema = new Schema({
  label: { type: String },
  balances: [{
    type: Schema.Types.ObjectId,
    ref: 'balances',
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
});

const Model = mongoose.model('banks', banksSchema);
export default Model;
