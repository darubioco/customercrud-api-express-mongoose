const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  address: {
    type: String,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[^@\s]+@[^@\s]+/,
    maxlength: 100,
  },
  phone: {
    type: String,
    maxlength: 20,
  },
  credit: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      /* eslint-disable no-underscore-dangle, no-param-reassign */
      delete ret._id;
      delete ret.__v;
      /* eslint-enable no-underscore-dangle, no-param-reassign */
    },
    virtuals: true,
  },
});

module.exports = mongoose.model('Customer', customerSchema);
