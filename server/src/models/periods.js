import mongoose from 'mongoose';
import OperationModel from './operations';
import RecurrentOperationModel from './recurrentOperations';
import BalanceModel from './balances';
import BankModel from './banks';

const Schema = mongoose.Schema;
const PeriodsSchema = new Schema({
  month: { type: Number },
  year: { type: Number },
  archivedAt: { type: Date },
  operations: [{
    type: Schema.Types.ObjectId,
    ref: 'operations',
  }],
  balances: [{
    type: Schema.Types.ObjectId,
    ref: 'balances',
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

PeriodsSchema.statics.addOperation = function(id, label, dt, amount, user) {
  return this.findOne({ _id: id, user }).then(period => {
    const operation = new OperationModel({ label, dt, amount, period, user });
    period.operations = period.operations.concat([operation]);
    return Promise.all([operation.save(), period.save()]).then(([operation, period]) => period);
  });
};

PeriodsSchema.statics.deleteOperation = function(id, idOperation, user) {
  return OperationModel.remove({ _id: idOperation, user }).then(() => {
    return this.findById(id).then(period => {
      period.operations = period.operations = period.operations.filter(_id => (_id.toString() !== idOperation));
      return period.save().then(period => (period));
    });
  });
};

PeriodsSchema.statics.findOperations = function(id, user) {
  return this.findById({ _id: id, user })
    .populate('operations')
    .then(period => period.operations);
};

PeriodsSchema.statics.importRecurrentOperations = function(id, user) {
  return this.findById({ _id: id, user }).then((period) => {
    return RecurrentOperationModel.find({ user }).then((operations) => {
      const promises = [];
      operations.forEach((operation) => {
        const newOperation = new OperationModel({
          isRecurrent: true,
          label: operation.label,
          dt: `${period.year}-${period.month}-${operation.day}`,
          amount: operation.amount,
          period,
          user,
        });
        period.operations = period.operations.concat([newOperation]);
        promises.push(newOperation.save());
      });
      promises.push(period.save());
      return Promise.all(promises).then((data) => (period));
    });
  });
};

PeriodsSchema.statics.findBalances = function(id, user) {
  return this.findOne({ _id: id, user })
    .populate('balances')
    .then(period => period.balances);
};

PeriodsSchema.statics.initializeBankBalances = function(id, user) {
  return this.findOne({ _id: id, user }).then((period) => {
    const promises = [];
    return BankModel.find({ user }).then((banks) => {
      banks.forEach((bank) => {
        const balance = new BalanceModel({
          period,
          bank,
          amount: 0,
          user,
        });
        bank.balances = bank.balances.concat([balance]);
        period.balances = period.balances.concat([balance]);
        promises.push(balance.save());
        promises.push(bank.save());
      });
      promises.push(period.save());
      return Promise.all(promises).then((data) => (period));
    });
  });
};

PeriodsSchema.statics.periodBalance = async function(id, user) {
  const banks = await BalanceModel.aggregate([
    {
      $match: {
        period: new mongoose.Types.ObjectId(id),
        user: new mongoose.Types.ObjectId(user.id),
      },
    },
    {
      $group: {
        _id: '1',
        balance: {
          $sum: '$amount'
        }
      }
    }
  ]);

  const operations = await OperationModel.aggregate([
    {
      $match: {
        period: new mongoose.Types.ObjectId(id),
        user: new mongoose.Types.ObjectId(user.id),
        $or: [
          { pointedAt: { $exists: false } },
          { pointedAt: null },
        ]
      }
    },
    {
      $group: {
        _id: '1',
        balance: {
          $sum: '$amount'
        }
      }
    }
  ]);

  return {
    banks: banks[0] ? banks[0].balance : 0,
    operations: operations[0] ? operations[0].balance : 0,
  };
};

const Model = mongoose.model('periods', PeriodsSchema);
export default Model;
